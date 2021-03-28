
start:
	docker-compose -f docker-compose.yml -f docker-compose.override.yml.prod build && docker-compose -f docker-compose.yml -f docker-compose.override.yml.prod up -d

start_dev:
	docker-compose -f docker-compose.yml -f docker-compose.override.yml.dev build && docker-compose -f docker-compose.yml -f docker-compose.override.yml.dev up -d

stop:
	docker-compose stop


