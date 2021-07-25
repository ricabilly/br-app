package router

import (
	"github.com/gorilla/mux"
)

type RouteHandler struct {
	Router *mux.Router
}

func NewRouter() *RouteHandler {
	var routeHandler RouteHandler

	router := mux.NewRouter().StrictSlash(true)
	routeHandler.Router = router
	return &routeHandler
}
