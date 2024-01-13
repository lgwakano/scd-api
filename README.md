# Welcome to api 👋
[![Version](https://img.shields.io/npm/v/api.svg)](https://www.npmjs.com/package/api)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)

> Prisma API with basic CRUD for posts

## Install

```sh
npm dev-setup
```

## Run DB
This command:
1.Downloads the postgres image (Docker is required)
2.Creates the container
3.Generate the DB schema
4.Populate DB with seed
```sh
npm run docker:run:postgres
```

## Prisma Commands
Creates schema.prisma
```sh
npx prisma init
```
Generates Prisma Client (TS library with type-sage db access) based on Prisma Schema
```sh
npx prisma generate
```
Updates DB schema to match Prisma Schema
```sh
npx prisma db push
```
Opens GUI for Database
```sh
npx prisma studio
```


## Populate DB
```sh
npm run seed
```

## Usage

```sh
npm run build && npm run dev
```

## Run tests

```sh
npm run test
```

## Extra cmds

```sh
docker build -t scheduler-api .
docker run -p 3001:3001 scheduler-api
docker run -it --entrypoint sh scheduler-api
```


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_