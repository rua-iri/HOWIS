include .env

hello:
	@echo "Hello, World"

build:
	@sam build > /dev/null
	@echo "\n\nSAM Has built successfully\n\n"


local:
	@echo "Running SAM Locally"
	$(MAKE) build

	sam local start-api

deploy:
	$(MAKE) build
	sam deploy

delete:
	sam delete
