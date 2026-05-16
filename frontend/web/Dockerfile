# ===== STAGE 1: BUILD =====
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

# ===== STAGE 2: NGINX =====
FROM nginx:1.25-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/collectible-cards-shop/browser /usr/share/nginx/html

COPY public/assets/config/config.json.template /usr/share/nginx/html/assets/config/config.json.template

CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/assets/config/config.json.template > /usr/share/nginx/html/assets/config/config.json && nginx -g 'daemon off;'"]

EXPOSE 80
