FROM node:14
MAINTAINER Pereskokov Vladislav (v.pereskokov@ivpa.ru)

ARG BUILD
ARG VERSION

RUN apt-get update -y && \
    apt-get install -y nginx supervisor && \
    chown -R www-data:www-data /var/lib/nginx && \
    rm -rf /var/www/html/* && mkdir -p /var/www/html/ && \
    rm -rf /var/lib/apt/lists/*

COPY ./etc/nginx/stable-locations /etc/nginx/
COPY ./etc/nginx/unstable-locations /etc/nginx/
COPY ./etc/nginx/ssl /etc/nginx/
COPY ./etc/nginx/listen /etc/nginx/
COPY ./etc/nginx/common-locations /etc/nginx/
COPY ./etc/nginx/sites-available/ssr-app-name.conf /etc/nginx/sites-enabled/
COPY ./etc/nginx/locations /etc/nginx/

COPY ./etc/supervisord/app.conf /etc/supervisor/conf.d/
COPY ./ /var/www/html/

WORKDIR /var/www/html
RUN npm run init && \
    echo "APP_VERSION=${VERSION}" > .env && \
    npm run build:production && \
    echo "${VERSION}" > .version && \
    rm -rf @types client lib docker etc scripts server webpack www certs configs && \
