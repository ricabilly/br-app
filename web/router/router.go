package router

import (
	"net/http"
	"github.com/gorilla/mux"
)

type RouterHandler struct {
	Router *mux.Router
}

func NewRouterHandler() *RouterHandler {
	var routerHandler RouterHandler

	r := mux.NewRouter().StrictSlash(true)

	//api := r.PathPrefix("/api/").Subrouter()
    // Serve static assets directly.
    r.PathPrefix("/static").Handler(http.FileServer(http.Dir("client/dist/")))
    // Catch-all: Serve our JavaScript application's entry-point (index.html).
    r.PathPrefix("/").HandlerFunc(IndexHandler("client/dist/index.html"))
	r.HandleFunc("/health", health)


	routerHandler.Router = r
	return &routerHandler
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