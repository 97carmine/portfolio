FROM nginx:stable-alpine as builder

ARG ENABLED_MODULES="brotli headers-more"

RUN set -ex \
    && apk add --update --no-cache --virtual build-deps abuild autoconf automake byacc curl-dev flex g++ gcc geoip-dev \
        git libc-dev libmaxminddb-dev libstdc++ libtool linux-headers make mercurial musl-dev openssl openssl-dev \
        pcre-dev xz yajl-dev zlib-dev \
    # allow abuild as a root user
    && printf "#!/bin/sh\\nSETFATTR=true /usr/bin/abuild -F \"\$@\"\\n" > /usr/local/bin/abuild \
    && chmod +x /usr/local/bin/abuild \
    && hg clone -r ${NGINX_VERSION}-${PKG_RELEASE} https://hg.nginx.org/pkg-oss/ /opt/pkg-oss \
    && cd /opt/pkg-oss \
    && mkdir /tmp/packages \
    && for module in $ENABLED_MODULES; do \
        echo "Building $module for nginx-$NGINX_VERSION"; \
        if make -C /opt/pkg-oss/alpine list | grep -E "^$module\s+\d+" > /dev/null; then \
            echo "Building $module from pkg-oss sources"; \
            cd /opt/pkg-oss/alpine; \
            make abuild-module-$module BASE_VERSION=$NGINX_VERSION NGINX_VERSION=$NGINX_VERSION; \
            apk add $(. ./abuild-module-$module/APKBUILD; echo $makedepends;); \
            make module-$module BASE_VERSION=$NGINX_VERSION NGINX_VERSION=$NGINX_VERSION; \
            find ~/packages -type f -name "*.apk" -exec mv -v {} /tmp/packages/ \;; \
        else \
            echo "Don't know how to build $module module, exiting"; \
            exit 1; \
        fi; \
    done \
    # cleaning
    && apk del build-deps \
    && rm -rf /opt/*

FROM nginx:stable-alpine

COPY --from=builder /tmp/packages /tmp/packages

RUN set -ex \
    && apk add --update --no-cache --allow-untrusted /tmp/packages/nginx-module-*.apk \
    # create check logs file script
    && printf '%s\n' '#! /bin/ash' \
        'ACCESS_LOG=/var/log/nginx/access.log;' \
        'ERROR_LOG=/var/log/nginx/error.log;' \
        'check_file() { [ ! -f "$1" ] || [ ! -L "$1" ]; touch "$1"; chown nginx:nginx "$1"; }' \
        'check_file $ACCESS_LOG' \
        'check_file $ERROR_LOG' > /docker-entrypoint.d/40-check-log-files.sh \
    # set permissions to files added to entrypoint folder
    && chmod 775 /docker-entrypoint.d/40-check-log-files.sh \
    # implement changes required to run Nginx as an unprivileged user
    && sed -i 's,listen       80;,listen       8080;,' /etc/nginx/conf.d/default.conf \
    && sed -i '/user  nginx;/d' /etc/nginx/nginx.conf \
    && sed -i 's,/var/run/nginx.pid,/tmp/nginx.pid,' /etc/nginx/nginx.conf \
    && sed -i "/^http {/a \    proxy_temp_path /tmp/proxy_temp;\n    client_body_temp_path /tmp/client_temp;\n    fastcgi_temp_path /tmp/fastcgi_temp;\n    uwsgi_temp_path /tmp/uwsgi_temp;\n    scgi_temp_path /tmp/scgi_temp;\n" /etc/nginx/nginx.conf \
    # nginx user must own the cache and etc directory to write cache and tweak the nginx config
    && chown -R nginx:nginx /var/cache/nginx \
    && chmod -R g+w /var/cache/nginx \
    && chown -R nginx:nginx /etc/nginx \
    && chmod -R g+w /etc/nginx \
    && chown -R nginx:nginx /var/log/nginx \
    && chmod -R g+w /var/log/nginx \
    # cleaning
    && rm -rf /tmp/packages /usr/share/nginx

HEALTHCHECK --interval=1m30s --timeout=10s --start-period=30s --retries=3 \
    CMD pgrep "nginx" > /dev/null || exit 1

VOLUME /etc/nginx/ssl

USER nginx

EXPOSE 8080 8443