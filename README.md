# Node.JS - Express - Sequelize - Starter Project

## About

A complete Node.JS starter project to bootstrap any projects that you may want to create Express/Sequelize as an API.

## How to install

1 - Git clone this repo

```bash
git clone https://github.com/tiagorccabral/node-express-starter.git
```

2 - This project can be executed with Docker.
So, if you don't have it already, [install docker here.](https://www.docker.com/get-started)

3 - Copy the contents of .env.example to a .env file on the Root of your project

4 - Build the container images

```bash
docker-compose build
```

5 - Run the project

```bash
docker-compose up
```

## Running Tests

To run tests in a Docker environment follow this steps:

1 - Copy the contents of .env.example to a .env file on the Root of your project

2 - Build the container images

```bash
docker-compose -f docker-compose.test.yml build
```

3 - Start the containers

```bash
docker-compose -f docker-compose.test.yml up -d
```

4 - Run the tests

```bash
docker exec -i node-express-starter_api_1 yarn test
```

_Obs:_ if you run into a ECONNREFUSED error, wait a few seconds as it may be due to the test DB container still be booting up.

---

Or you may also run the following command (requires local instance of DB running):

To run the test suite, please use the folowing command

```bash
yarn test
```
