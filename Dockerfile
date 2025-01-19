FROM node:lts AS builder
WORKDIR /app

COPY . .

RUN npm ci
RUN npm run build

FROM docker.io/library/nginx:stable-alpine-slim as runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000