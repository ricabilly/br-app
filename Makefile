install:
	go get -u github.com/gorilla/mux
	
build-dev:
	docker build --target dev docker -t go
dev:
	docker run -it -v ~/Documents/personal/projects/chalkwarts:/work -p 3000:3000 go sh