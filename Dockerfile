# Static export (`output: "export"`) built with Node, served by nginx on Cloud Run.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
# Pre-compress at level 9; nginx's gzip_static serves the .gz as-is (no CPU per
# request). The 3D models shrink ~10x, so this is most of their load time.
RUN find out -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' -o -name '*.json' \
      -o -name '*.txt' -o -name '*.xml' -o -name '*.svg' -o -name '*.webmanifest' \
      -o -name '*.glb' -o -name '*.gltf' -o -name '*.bin' -o -name '*.ttf' \) \
      -exec sh -c 'for f; do gzip -9 -c "$f" > "$f.gz"; done' sh {} +

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
# Cloud Run sends traffic to 8080.
EXPOSE 8080
