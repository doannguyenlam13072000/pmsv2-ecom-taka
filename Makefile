.PHONY: up build build-one down

# Set default env as develop if ENV is not specified.
ENV ?= development
ERROR_MESSAGE = ">>> Tag not provided. Please provide a tag. <<<"

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
	@if [ -z "$(tag)" ]; then \
		echo $(ERROR_MESSAGE); \
	else \
		$(COMPOSE) build $(tag); \
	fi

stop-one:
	@if [ -z "$(tag)" ]; then \
		echo $(ERROR_MESSAGE); \
	else \
		$(COMPOSE) stop $(tag); \
	fi

exec:
	@if [ -z "$(tag)" ]; then \
		echo $(ERROR_MESSAGE); \
	else \
		$(COMPOSE) exec -it $(tag) /bin/bash; \
	fi
	
# Kill all containers
down:
	$(COMPOSE) kill

# Remove all containers and images
clean-all:
	$(COMPOSE) down --rmi all --volumes --remove-orphans
	@echo "All containers and images have been removed."

help:
	@echo "Available targets:"
	@echo " up              Build and run all container"
	@echo " build           Build all container"
	@echo " build-one       Build onse specified containerr"
	@echo " stop-one        Stop the specified container"
	@echo " exec            Exec in to the specified container"
	@echo " down            Kill all container"
	@echo " clean-all       Remove all containers and images"
	@echo " help            Show this help message"