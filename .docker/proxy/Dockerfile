# Defines version arguments for Nginx, ModSecurity and OWASP CRS
ARG NGINX_VERSION=1.26.2
ARG MODSECURITY_VERSION=3.0.13
ARG OWASP_CRS_VERSION=4.10.0

# Base image
FROM alpine:latest AS build

ARG NGINX_VERSION
ARG MODSECURITY_VERSION
ARG OWASP_CRS_VERSION

# Set the working directory to /opt
WORKDIR /opt

# Install the necessary dependencies and configure the repositories
RUN set -eux \
    # ModSecurity optional dependency ssdeep not installed
    && apk add --no-cache --virtual .build-deps \
        autoconf automake build-base cmake curl curl-dev g++ geoip geoip-dev git \
        libtool libxml2 libxml2-dev linux-headers lmdb lmdb-dev lua5.4 lua5.4-dev m4 \
        openssl-dev pcre-dev pcre2 pcre2-dev yajl yajl-dev zlib-dev \
    # Clone and compile ModSecurity
    && git clone -b v${MODSECURITY_VERSION} --depth 1 --single-branch https://github.com/owasp-modsecurity/ModSecurity modsecurity \
    && cd modsecurity \
    && git submodule update --init \
    && ./build.sh \
    && ./configure --with-lmdb --with-pcre2 \
    && make \
    && make install \
    && cd .. \
    # Clone and compile Brotli
    && git clone -b master --depth 1 --single-branch https://github.com/google/brotli brotli \
    && cd brotli \
    && mkdir out \
    && cmake -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/usr/local/brotli -S . -B out \
    && cmake --build out --target install \
    && cd .. \
    # Prepare the necessary directories and clone the additional module repositories
    && mkdir -p /etc/nginx/modules \
    && git clone -b master --depth 1 --single-branch https://github.com/google/ngx_brotli brotli-nginx \
    && cd brotli-nginx \
    && git submodule update --init \
    && cd .. \
    && git clone -b master --depth 1 --single-branch https://github.com/owasp-modsecurity/modsecurity-nginx modsecurity-nginx \
    && git clone -b master --depth 1 --single-branch https://github.com/openresty/headers-more-nginx-module headers-more-nginx \
    # Clone the OWASP CRS repository and configure CRS
    && git clone -b v${OWASP_CRS_VERSION} --depth 1 --single-branch https://github.com/coreruleset/coreruleset owasp-crs \
    # Download and unzip the Nginx source code
    && wget https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz \
    && tar zxf nginx-${NGINX_VERSION}.tar.gz \
    && cd nginx-${NGINX_VERSION} \
    # Configure, compile and install Nginx with additional modules, including ModSecurity
    && ./configure \
    --add-dynamic-module=/opt/brotli-nginx \
    --add-dynamic-module=/opt/headers-more-nginx \
    --add-dynamic-module=/opt/modsecurity-nginx \
    --with-compat \
    --with-http_ssl_module \
    --with-http_v3_module \
    --with-cc-opt="-I/usr/local/brotli/include -I/usr/local/modsecurity/include" \
    --with-ld-opt="-L/usr/local/brotli/lib -L/usr/local/modsecurity/lib" \
    && make modules \
    # Move compiled modules to final location
    && mv objs/*.so /etc/nginx/modules/ \
    # Remove build dependencies to reduce image size
    && apk del .build-deps

# Final image based on nginxinc/nginx-unprivileged
FROM nginxinc/nginx-unprivileged:${NGINX_VERSION}-alpine-slim

ARG MODSECURITY_VERSION
ARG ACCESS_LOG=/var/log/nginx/access.log
ARG ERROR_LOG=/var/log/nginx/error.log

USER root

# Copy the compiled and configured files from the previous stages
COPY --from=build /etc/nginx/modules /etc/nginx/modules
COPY --from=build /usr/local/modsecurity/lib/libmodsecurity.so.${MODSECURITY_VERSION} /usr/local/modsecurity/lib/
COPY --from=build /opt/owasp-crs/rules /etc/modsecurity.d/rules
COPY --from=build /opt/modsecurity/modsecurity.conf-recommended /etc/modsecurity.d/modsecurity.conf
COPY --from=build /opt/modsecurity/unicode.mapping /etc/modsecurity.d/unicode.mapping
COPY --from=build /opt/owasp-crs/crs-setup.conf.example /etc/modsecurity.d/crs-setup.conf

ENV LD_LIBRARY_PATH=/usr/local/modsecurity/lib:$LD_LIBRARY_PATH

# Configure and assign permissions to ModSecurity log files and rules
RUN set -eux \
    # Add Modsecurity dependencies
    && apk add --no-cache libcurl geoip libxml2 lmdb lua5.4 yajl libstdc++ \
    && ln -s /usr/local/modsecurity/lib/libmodsecurity.so.${MODSECURITY_VERSION} /usr/local/modsecurity/lib/libmodsecurity.so.3.0 \
    && ln -s /usr/local/modsecurity/lib/libmodsecurity.so.${MODSECURITY_VERSION} /usr/local/modsecurity/lib/libmodsecurity.so.3 \
    && ln -s /usr/local/modsecurity/lib/libmodsecurity.so.${MODSECURITY_VERSION} /usr/local/modsecurity/lib/libmodsecurity.so \
    && wget -qO /etc/ssl/certs/dhparam-2048.pem https://ssl-config.mozilla.org/ffdhe2048.txt \
    && wget -qO /etc/ssl/certs/dhparam-4096.pem https://ssl-config.mozilla.org/ffdhe4096.txt \
    # Create check logs file script
    && printf "%s\n" "#! /bin/ash" \
        "ACCESS_LOG=${ACCESS_LOG};" \
        "ERROR_LOG=${ACCESS_LOG};" \
        'check_file() { [ ! -f "$1" ] || [ ! -L "$1" ]; touch "$1"; chown nginx:nginx "$1"; }' \
        'check_file "$ACCESS_LOG"' \
        'check_file "$ERROR_LOG"' > /docker-entrypoint.d/40-check-log-files.sh \
    # Set permissions to files added to entrypoint folder
    && chmod 775 /docker-entrypoint.d/40-check-log-files.sh \
    && find /etc/modsecurity.d/rules -type f -name "*.example" -exec sh -c 'mv "$0" "${0%.example}"' {} \; \
    # Change default response code to 444
    && sed -i 's/status:400/status:444/g' /etc/modsecurity.d/modsecurity.conf \
    && sed -i "s/\(phase:[12],log,auditlog,pass\)/\1,status:444/g" /etc/modsecurity.d/crs-setup.conf \
    # Enable ModSecurity
    && sed -i 's/SecRuleEngine DetectionOnly/SecRuleEngine On/' /etc/modsecurity.d/modsecurity.conf \
    # Disable ModSecurity logging
    && sed -i 's/SecAuditEngine RelevantOnly/SecAuditEngine Off/' /etc/modsecurity.d/modsecurity.conf \
    # Generate main file that include the default rules and OWASP rules
    && printf "%s\n" "Include /etc/modsecurity.d/modsecurity.conf" \
        "Include /etc/modsecurity.d/crs-setup.conf" \
        "Include /etc/modsecurity.d/rules/*.conf" > /etc/nginx/modsecurity.conf \
    # Remove default root directory
    && rm -rf /usr/share/nginx


# Add a HEALTHCHECK to check if Nginx is running
HEALTHCHECK --interval=1m30s --timeout=10s --start-period=30s --retries=3 \
    CMD pgrep "nginx" > /dev/null || exit 1

# Defines a volume to store SSL certificates
VOLUME /etc/nginx/ssl

# Exposes port 8080 for HTTP and 8443 for HTTPS
EXPOSE 8080 8443

USER nginx
