package server

import (
	RouterFactory "br-app/api/router"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/handlers"
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

	//TODO CORS <---------------------------

	server.Port = port
	server.Addr = ":" + strconv.Itoa(port)
	server.HTTPServer = &http.Server{
		Addr:         server.Addr,
		Handler:      handlers.CORS(handlers.AllowedOrigins([]string{"*"}))(router),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
	}

	return &server
}
