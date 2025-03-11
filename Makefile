test:
	@sam --help > /dev/null
hello:
	@echo "Hello, World"

build:
	@sam build > /dev/null

local:
	@echo "Running SAM Locally"
	$(MAKE) build

	@echo "\n\nSAM Has built successfully\n\n"
	sam local start-api
