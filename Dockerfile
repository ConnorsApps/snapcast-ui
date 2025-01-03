FROM node:22-alpine AS build
WORKDIR /app

ARG REACT_APP_HOME_TITLE
ARG REACT_APP_SNAPCAST_HOST
ARG REACT_APP_THEME


COPY package*.json ./

RUN npm ci

COPY ./src ./src
COPY ./public ./public

RUN npm run build

FROM node:22-alpine AS dev
WORKDIR /app 

COPY package*.json ./
RUN npm install

ENTRYPOINT [ "npm", "start" ]

FROM nginx:alpine-slim
WORKDIR /app

COPY --from=build /app/build ./build

COPY ./nginx.conf /etc/nginx/nginx.conf
