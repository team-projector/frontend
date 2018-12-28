FROM nginx:1.14-alpine

ADD docker/nginx.conf /etc/nginx/nginx.conf
COPY dist/ /var/www
