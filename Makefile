.PHONY: build
build:
		docker-compose build web

.PHONY: serve
serve:    
		docker-compose run --rm --service-ports web

.PHONY: test
test:
		docker-compose run --rm web npm run test

.PHONY: format
format:
		docker-compose run --rm web npm run format:fix

.PHONY: lint
lint:
		docker-compose run --rm web npm run lint:fix
