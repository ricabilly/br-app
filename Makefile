build:
	docker-compose build

run:
	echo "Starting database"
	docker-compose up -d mysql
	timeout 5
	echo "Starting api and webserver"
	docker-compose up -d

stop:
	docker-compose down