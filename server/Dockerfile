FROM node:17-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .