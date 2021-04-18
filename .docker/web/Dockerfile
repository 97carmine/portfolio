FROM node:lts-alpine

LABEL maintainer="97carmine"

WORKDIR /opt

COPY .yarn ./.yarn
COPY package.json yarn.lock .yarnrc.yml .docker/web/healthcheck.mjs ./

RUN yarn install --immutable --check-cache

COPY . .

RUN rm -r .docker \
    && yarn build:prod

EXPOSE 3000

HEALTHCHECK --interval=1m30s --timeout=10s --start-period=30s --retries=3\
    CMD node healthcheck.mjs

CMD yarn start:prod