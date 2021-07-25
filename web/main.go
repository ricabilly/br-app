package main

import (
	ServerFactory "br-app/web/server"
)

var port int

func init() {
	port = 3000
}

func main() {
	server := ServerFactory.NewServer(port)
	server.Start()
}
