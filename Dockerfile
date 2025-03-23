# Build
FROM node:23.10.0 AS builder
WORKDIR /
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# NGINX에 배포
FROM nginx:1.25
RUN mkdir -p /usr/share/nginx/html
COPY --from=builder /dist/. /usr/share/nginx/html/
EXPOSE 80
