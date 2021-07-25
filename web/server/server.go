package server

import (
	"log"
	"net/http"
	"strconv"
	"time"
	RouterHandlers "br-app/web/router"
)

// Server object type
type Server struct {
	Port       int
	Addr       string
	HTTPServer *http.Server
}

// Start the server
func (s *Server) Start() {
	log.Println("Server started on port", s.Port)
	log.Fatal(s.HTTPServer.ListenAndServe())
}

// Create a new server object
func NewServer(port int) *Server {
	var server Server

	routerHandler := RouterHandlers.NewRouterHandler()

	server.Port = port
	server.Addr = ":" + strconv.Itoa(port)
	server.HTTPServer = &http.Server{
		Addr:         server.Addr,
		Handler:      routerHandler.Router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	return &server
}
