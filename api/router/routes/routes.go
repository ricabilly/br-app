package routes

import (
	"br-app/api/db"
	"br-app/api/utils"
	"time"

	"encoding/json"
	"errors"
	"net/http"

	"github.com/gorilla/mux"
)

// BindRoutes adds the routes to a router.
func BindRoutes(r *mux.Router) {

	r.Use(authorization)

	r.HandleFunc("/health", health)
	r.HandleFunc("/user/login", login).Methods("POST")
	r.HandleFunc("/user/add", addUser).Methods("POST")
	r.HandleFunc("/boulder", getBoulders).Methods("GET")
	r.HandleFunc("/boulder/edit", editBoulder).Methods("POST")

}

// Health is a simple health route.
func health(w http.ResponseWriter, r *http.Request) {
	writeResponse(w, "Healthy", http.StatusOK)
}

func addUser(w http.ResponseWriter, r *http.Request) {
	headerContentTtype := r.Header.Get("Content-Type")
	if headerContentTtype != "application/json" {
		writeResponse(w, "Content Type is not application/json", http.StatusUnsupportedMediaType)
		return
	}

	var unmarshalErr *json.UnmarshalTypeError
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	user := new(db.User)
	err := decoder.Decode(&user)
	if err != nil {
		if errors.As(err, &unmarshalErr) {
			writeResponse(w, "Bad Request. Wrong Type provided for field "+unmarshalErr.Field, http.StatusBadRequest)
		} else {
			writeResponse(w, "Bad Request "+err.Error(), http.StatusBadRequest)
		}
		return
	}
	user.Password, _ = utils.HashPassword(user.Password)
	_, err = db.EditUser(user)
	if err != nil {
		writeResponse(w, "Could not add user", http.StatusInternalServerError)
		return
	}
	writeResponse(w, "User "+user.Username+" added", http.StatusOK)
}

// editBoulder is the handler function to add or edit a boulder
func editBoulder(w http.ResponseWriter, r *http.Request) {
	headerContentTtype := r.Header.Get("Content-Type")
	if headerContentTtype != "application/json" {
		writeResponse(w, "Content Type is not application/json", http.StatusUnsupportedMediaType)
		return
	}

	var unmarshalErr *json.UnmarshalTypeError
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()

	boulder := new(db.Boulder)
	err := decoder.Decode(&boulder)
	if err != nil {
		if errors.As(err, &unmarshalErr) {
			writeResponse(w, "Bad Request. Wrong Type provided for field "+unmarshalErr.Field, http.StatusBadRequest)
		} else {
			writeResponse(w, "Bad Request "+err.Error(), http.StatusBadRequest)
		}
		return
	}

	boulder.Date = time.Now().Format(time.RFC3339)

	boulder, err = db.EditBoulder(boulder)

	if err != nil {
		writeResponse(w, "Internal Server Error "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	jsonResp, _ := json.Marshal(boulder)
	w.Write(jsonResp)
}

// getBoulders fetches all boulders
func getBoulders(w http.ResponseWriter, r *http.Request) {
	boulders, err := db.GetBoulders()
	if err != nil {
		writeResponse(w, "Internal Server Error "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	jsonResp, _ := json.Marshal(boulders)
	w.Write(jsonResp)
}

// writeResponse writes a simple json response
func writeResponse(w http.ResponseWriter, message string, httpStatusCode int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(httpStatusCode)
	resp := make(map[string]string)
	resp["message"] = message
	jsonResp, _ := json.Marshal(resp)
	w.Write(jsonResp)
}
