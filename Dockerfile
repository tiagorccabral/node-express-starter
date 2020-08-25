FROM node:12.18.3-alpine

RUN mkdir -p /home/node-express-starter && chown -R node:node /home/node-express-starter
RUN apk add --no-cache bash

# Creates the work directory for the project
WORKDIR /home/node-express-starter

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

COPY wait-for-it.sh .

EXPOSE 3000