package server

import (
	RouterFactory "br-app/web/server/router"
	"log"
	"net/http"
	"strconv"
	"time"
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

	router := RouterFactory.NewRouter()

	server.Port = port
	server.Addr = ":" + strconv.Itoa(port)
	server.HTTPServer = &http.Server{
		Addr:         server.Addr,
		Handler:      router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	return &server
}
