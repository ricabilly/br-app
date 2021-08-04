package router

import (
	Routes "br-app/api/router/routes"

	"github.com/gorilla/mux"
)

func NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)

	Routes.BindRoutes(router)

	return router
}
