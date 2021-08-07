FROM node:10.13 as build

ARG BUILD_COMMAND="npm run build"

WORKDIR /src

COPY package.json .
RUN npm install

COPY . .

RUN ["/bin/bash", "-c", "$BUILD_COMMAND"]


FROM nginx:1.17.4-alpine as production

ARG APP_VERSION

WORKDIR /var/www

COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/dist .

RUN addgroup -S -g 10001 app \
    && adduser -S -u 10001 \
        -s /sbin/false \
        -G app \
        -H -h /app  \
        app \
    && mkdir /var/run/nginx \
    && chown app:app /var/run/nginx \
    && ln -sf /dev/stderr /var/run/nginx/error.log

ENV APP_VERSION=$APP_VERSION

USER app

EXPOSE 8080
