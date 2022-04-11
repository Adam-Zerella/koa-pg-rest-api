# koa-pg-rest-api (KPRA)

[![CI](https://github.com/Adam-Zerella/koa-pg-rest-api/actions/workflows/CI.yml/badge.svg)](https://github.com/Adam-Zerella/koa-pg-rest-api/actions/workflows/CI.yml)

> Scaffolding for an opinionated RESTful API using Koa and PostgreSQL. 🦴

[Koa](https://koajs.com/) is an alternative to Express.js.

## Usage 📖

Getting started...

## Local development

This app relies on [Nodemon](https://nodemon.io/) for local development, hot-reloading and debugging.

### Getting started 🌱

```sh
yarn install
```

#### Database setup 📦

As we rely on [Postgres](https://www.postgresql.org/), we need to create, migrate and connect to an instance somewhere.

A popular solution is to run an instance via [Docker](https://www.docker.com/).

```sh
docker run \
    -e POSTGRES_PASSWORD=postgres \
    -e POSTGRES_DB=todos \
    -e LANG='en_US.UTF-8' \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v $(pwd)/data:/var/lib/postgresql/data \
    -p 5432:5432 \
    -d postgres:14
```

From here, you can connect using a popular client such as [Postbird](https://www.electronjs.org/apps/postbird) or [pgAdmin4](https://www.pgadmin.org/download/) to visualise and interact with the database.

##### Migrations

To create the database tables and seed it with some initial data:

```sh
yarn db
```

#### Hot reloading 🔫

To spin up a local instance of this API:

```sh
yarn dev
```

## Deployment 🚢

You could run this container through any major cloud provider, though for local testing try:

```sh
docker build . -t kpra-dev
```

and:

```sh
docker run \
    -e CORS_ORIGIN=* \
    -e PORT=5000 \
    -e DB_URI=postgresql://postgres:postgres@127.0.0.1:5432/todos \
    -p 5000:5000 \
    -d \
    kpra-dev
```

## Documentation 📚

From the project root directory, run this command to generate an OpenAPI 3 Swagger definition at `docs/dist/swagger.json`:

```sh
yarn docs
```


## Known issues

### Logs out of order

During development, and the way our logging framework [Pino](https://github.com/pinojs/pino) works, you'll
see that the log order is out of order. This might seem like an error at first however, it's expected
behaviour due to the way [Pino processes stdout/stderr events](https://github.com/pinojs/pino-pretty/issues/275).
