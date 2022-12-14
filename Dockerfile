FROM node:18-alpine as build

ARG REACT_APP_HOME_TITLE
ARG REACT_APP_SNAPCAST_HOST

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY ./src ./src
COPY ./public ./public

RUN npm run build

FROM nginx:alpine

WORKDIR /app

COPY --from=build /app/build ./build

COPY ./nginx.conf /etc/nginx/nginx.conf