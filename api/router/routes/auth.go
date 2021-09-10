package routes

import (
	"br-app/api/db"
	"br-app/api/utils"
	"encoding/base64"
	"encoding/json"
	"log"
	"net/http"
	"strings"
)

// authorization is the middleware for checking if a user is logged in via JWT access token
func authorization(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/user/login" {
			next.ServeHTTP(w, r)
		} else {
			token := r.Header.Get("Authorization")
			token = strings.TrimSpace(token)
			if token == "" {
				w.WriteHeader(http.StatusForbidden)
				json.NewEncoder(w).Encode("Not authorized")
				return
			}
			err := utils.ValidateJWT(token)
			if err != nil {
				w.WriteHeader(http.StatusForbidden)
				json.NewEncoder(w).Encode("Not authorized")
				return
			}
			next.ServeHTTP(w, r)
		}
	})
}

//login is the route where one can log in
func login(w http.ResponseWriter, r *http.Request) {
	type LoginResponse struct {
		User  *db.User `json:"user"`
		Token string   `json:"token"`
	}

	credentials := r.Header.Get("Authentication")
	if credentials == "" {
		writeResponse(w, "Bad request", http.StatusBadRequest)
		return
	}
	decoded, err := base64.URLEncoding.DecodeString(credentials)
	if err != nil {
		writeResponse(w, "Bad request", http.StatusBadRequest)
		return
	}
	splits := strings.Split(string(decoded), ":")
	if len(splits) != 2 {
		writeResponse(w, "Bad request", http.StatusBadRequest)
		return
	}
	username := splits[0]
	pw := splits[1]
	log.Printf("User %s tries to login with password '%s'\n", username, pw)
	user, err := db.GetUser(username)
	if err != nil {
		writeResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if user != nil {
		if utils.CheckPasswordHash(pw, user.Password) {
			user.Password = ""
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			token, err := utils.CreateJWT(user.Username)
			if err != nil {
				writeResponse(w, "Error occured", http.StatusInternalServerError)
				return
			}
			resp := LoginResponse{
				User:  user,
				Token: token,
			}
			jsonResp, _ := json.Marshal(resp)
			w.Write(jsonResp)
		} else {
			writeResponse(w, "Not authorized", http.StatusUnauthorized)
		}
	} else {
		writeResponse(w, "User not found", http.StatusNotFound)
	}

}
