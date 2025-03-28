# Build
FROM node:23.10.0 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build -- --dest dist

# NGINX에 배포
FROM nginx:1.25
RUN mkdir -p /usr/share/nginx/html
COPY --from=builder /app/dist/. /usr/share/nginx/html/
EXPOSE 80
