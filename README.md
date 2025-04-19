# Nimstoryfont

TODO: Write in here what this is about. Some merger of frontend/README.md and backend/README.md.

## Dependencies / Programs this relies on

You'll need to have the following programs installed for this repository to work properly:

- ansible: Enables all commands available via `./ns run`
- flyway: Handles database migrations

## Infrastructure Setup

### General

The infrastructure is entirely built around docker-compose. Therefore the following applies:

- The Frontend-section and backend-section define build commands to build their section of the application
- Those build commands are used by dockerfiles of each section to first build and then containerize the build-output
- Those dockerfiles are used by either github actions (for CI) or docker-compose files (for development)

Note: All Dockerfiles have 2-phases:

1. The build-phase which sets up a build-environment and which builds the project
2. The run-phase which sets up a runtime-environment and which copies the build-output

### Usage

The project automatically builds releases of the current main branch whenever it changes, see:

- [frontend](https://github.com/users/PhilippMDoerner/packages/container/package/nginx_frontend-dev)
- [backend](https://github.com/users/PhilippMDoerner/packages/container/package/backend-dev)

These packages are just docker images for use with i.e. the docker-compose.yml.
Use that file as a baseline for your own deployments if you want to make one.

### Development

For development use the provided docker-compose files in the root directory.
They describe their uses in doc comments.
