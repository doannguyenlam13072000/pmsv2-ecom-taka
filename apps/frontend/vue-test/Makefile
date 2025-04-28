.PHONY: install run build format bundle purge

# Set default env as develop if ENV is not specified.
ENV ?= development

# Define GIT_REVISION and GIT_TAG or provide default values.
GIT_REVISION ?= default_revision
GIT_TAG ?= default_tag

# Define the YARN command with environment variables.
YARN := VUE_APP_GIT_REVISION=$(GIT_REVISION) VUE_APP_GIT_TAG=$(GIT_TAG) yarn

install:
	@echo "Installing dependencies..."
	yarn install --frozen-lockfile || (echo "Error: Failed to install dependencies."; exit 1)

# Run development environment
run:
	@echo "Launch the application in the DEV environment ..."
	yarn dev

# Run development environment
run-staging:
	@echo "Launch the application in the STAGING environment ..."
	yarn dev

# Run production environment
start:
	@echo "Launch the application in the PRODUCTION environment ..."
	yarn dev

# Build staging
buid-staging:
	@echo "Building the application for staging environment ..."
	yarn build:staging

# Build production
buid-production:
	@echo "Building the application for production environment ..."
	yarn build:production

# Bundle
bundle:
	@echo "Bundling schema ..."

purge:
	@echo "Removing node_modules ..."
	@rm -Rf ./node_modules

format:
	@echo "Formatting code ..."
	yarn format

run-lint:
	@echo "Running lint ..."
	yarn lint

lint-fix:
	@echo "Fixing lint issues ..."
	yarn lint:fix

test:
	@echo "Fixing lint issues ..."
	yarn test