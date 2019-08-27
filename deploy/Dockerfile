FROM node:8 as build

WORKDIR /src

COPY package.json .
RUN npm install

COPY . .
RUN npm run build


FROM nginx:alpine

WORKDIR /var/www

COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/dist .

EXPOSE 8080