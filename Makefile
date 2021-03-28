
build:
	docker-compose -f docker-compose.yml -f docker-compose.override.yml.prod build

build_dev:
	docker-compose -f docker-compose.yml -f docker-compose.override.yml.dev build

start: build
	docker-compose -f docker-compose.yml -f docker-compose.override.yml.prod up -d

start_dev: build_dev
	docker-compose -f docker-compose.yml -f docker-compose.override.yml.dev up -d

stop:
	docker-compose stop

cert_generate_dummy: cert_clean
	mkdir -p certbot/conf/live/paruzorus.ddns.net
	openssl req -x509 -nodes -newkey rsa:4096 -days 1 -keyout 'certbot/conf/live/paruzorus.ddns.net/privkey.pem' -out 'certbot/conf/live/paruzorus.ddns.net/fullchain.pem' -subj '/CN=localhost'
	curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "certbot/conf/options-ssl-nginx.conf"
	curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "certbot/conf/ssl-dhparams.pem"

cert_clean:
	rm -Rf certbot/conf/live
	rm -Rf certbot/conf/archive
	rm -Rf certbot/conf/renewal

cert_generate: cert_clean
	docker-compose -f certbot/docker-compose.yml run --rm certbot
	docker-compose -f certbot/docker-compose.yml stop
	
cert_renew:
	docker-compose -f certbot/docker-compose.yml run --rm --entrypoint "certbot renew" certbot
