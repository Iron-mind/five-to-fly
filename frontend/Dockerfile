FROM node:19-alpine3.17 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm run start
EXPOSE 3000

