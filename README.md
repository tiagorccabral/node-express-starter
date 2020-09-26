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

3 - Run the yarn setup command:
```bash
yarn setup
```

It will copy the .env.example file to a .env file (change here the variables if needed) and it will run the docker commands
(docker-compose build && docker-compose up)
## Starting the server
When you first install the project with yarn setup it already starts the server. If you want to start it again, use:

5 - Run the project

```bash
docker-compose up
```

## Running Tests

To run tests in a Docker environment run this command:

```bash
yarn dtest
```
_Obs:_ if you run into a ECONNREFUSED error, wait a few seconds as it may be due to the test DB container still be booting up.

---

Or you may also run the following command (requires local instance of DB running):

To run the test suite, please use the folowing command

```bash
yarn test
```

---

In case you wold like to generate a test coverage report, the following command is available

```bash
yarn dtest:coverage
```

## Postman requests
If you want to test requests with postman you can get the requests here:
[postman requests](https://www.getpostman.com/collections/91335f67fd1441344712)
