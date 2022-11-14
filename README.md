# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

## Installation Instructions

### Dev mode

To install the app's dependencies and use the app in dev mode, run the following:

`yarn && yarn create-db-dev`

`yarn create-db-dev` runs a script that uses db-migrate to create a new database called `storefront` and runs the migrations to create the tables `db-migrate up`. This script assumes you have installed `postgres` on your local system and the server is running.

To run the app in dev mode execute `yarn start`.

### Test mode

To install the app's dependencies and use the app in test mode, run the following:

`yarn && yarn create-db-test`

`yarn create-db-test` runs a script that uses db-migrate to create a new database called `storefront_test` and runs the migrations to create the tables. This script assumes you have installed `postgres` on your local system and the server is running.

To run the tests execute `yarn test`.

### Ports

The application runs on port `3000` with database on `5432`.

### Environment variables

To satisfy Udacity requirements, the following environment variable are needed.

```
NODE_ENV=dev

# DB VARIABLES
POSTGRES_HOST=localhost
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=admin
POSTGRES_PORT=5432
ENV=dev

# BCRYPT VARIABLES
BCRYPT_PASSWORD=my_password
SALT_ROUNDS=10

# JWT
TOKEN_SECRET=secret
```
