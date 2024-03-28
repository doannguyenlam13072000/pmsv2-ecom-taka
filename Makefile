.PHONY: up build build-one down

# Set default env as develop if ENV is not specified.
ENV ?= development

test:
	@echo $(ENV)

# Alias command for docker-compose.
COMPOSE := docker-compose

# Boot all containers
up:
	@echo "Running docker-compose with ENV=$(ENV)"
	$(COMPOSE) up -d

# Build all image
build:
	$(COMPOSE) build

# Build one image specified
build-one:
	$(COMPOSE) build $(tag)

# Kill all containers
down:
	$(COMPOSE) kill