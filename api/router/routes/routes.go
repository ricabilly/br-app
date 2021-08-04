package routes

import (
	"net/http"

	"github.com/gorilla/mux"
)

func BindRoutes(r *mux.Router) {

	r.HandleFunc("/health", health)
}

func health(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Healthy!"))
}
