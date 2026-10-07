# Static export (`output: "export"`) built with Node, served by nginx on Cloud Run.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
# Cloud Run sends traffic to 8080.
EXPOSE 8080
