build:
	docker-compose -f docker-compose.yml build

start:
	docker-compose -f docker-compose.yml up -d

start_dev:
	docker-compose -f docker-compose.yml -f docker-compose.override.yml.dev up -d

stop:
	docker-compose stop


