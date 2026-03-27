FROM node:24-alpine AS build
WORKDIR /app

ARG VITE_HOME_TITLE
ARG VITE_SNAPCAST_HOST
ARG VITE_THEME

COPY package*.json ./

RUN npm ci

COPY ./src ./src
COPY ./public ./public
COPY ./index.html ./
COPY ./vite.config.js ./

RUN npm run build

FROM node:24-alpine AS dev
WORKDIR /app

COPY package*.json ./
RUN npm install

ENTRYPOINT [ "npm", "run", "dev", "--", "--host", "0.0.0.0" ]

FROM nginx:alpine-slim
WORKDIR /app

COPY --chmod=755 --from=build /app/dist ./dist

COPY ./nginx.conf /etc/nginx/nginx.conf
