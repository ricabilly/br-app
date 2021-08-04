package router

import (
	"net/http"

	"github.com/gorilla/mux"
)

func NewRouter() *mux.Router {

	r := mux.NewRouter().StrictSlash(true)
	r.NotFoundHandler = http.NotFoundHandler()

	// Serve application entrypoint
	//r.HandleFunc("/", IndexHandler("client/index.html")).Name("root")

	// Check if server is running
	r.HandleFunc("/health", health).Name("health")

	// Serve static assets directly.
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("client/dist/"))).Name("static")

	return r
}

func health(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Healthy!"))
}

func IndexHandler(entrypoint string) func(w http.ResponseWriter, r *http.Request) {
	fn := func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, entrypoint)
	}
	return http.HandlerFunc(fn)
}
