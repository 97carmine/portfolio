#!/bin/sh

ssl_certificate=/etc/letsencrypt/live/${NGINX_HOSTNAME}/fullchain.pem
ssl_certificate_key=/etc/letsencrypt/live/${NGINX_HOSTNAME}/privkey.pem

echo "Checking if SSL exists"

if [[ -f $ssl_certificate && -f ${ssl_certificate_key} ]]; then
    echo "The certificates for the domain ${NGINX_HOSTNAME} exists, exiting...";
    exit 1;
else 
    echo "The certificates for the domain ${NGINX_HOSTNAME} doesn't exists, creating...";
    echo "Checking if certbot is installed";
    if [ -e "/usr/bin/certbot" ]; then
        echo "certbot is installed";
    else
        echo "certbot isn't installed, installing...";
        apk add --no-cache certbot;
        echo "certbot installed";
    fi

    echo "initializing certbot with DNS challenge...";

    certbot certonly --agree-tos --manual \
    --preferred-challenges dns \
    -d ${NGINX_HOSTNAME} -d www.${NGINX_HOSTNAME} \
    --renew-by-default \
    -m ${EMAIL_LETSENCRYPT} \
    --rsa-key-size 4096
fi
