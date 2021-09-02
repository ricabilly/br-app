package main

import (
	ServerFactory "br-app/web/server/server"
)

var port int

func init() {
	port = 80
}

func main() {
	server := ServerFactory.NewServer(port)
	server.Start()
}
