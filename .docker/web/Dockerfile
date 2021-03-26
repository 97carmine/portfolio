FROM node:lts-alpine

LABEL maintainer="97carmine"

WORKDIR /opt

COPY .yarn ./.yarn
COPY package.json yarn.lock .yarnrc.yml ./

RUN yarn install --immutable --check-cache

COPY . .

RUN yarn build:prod \
    && yarn cache clean --all \
    && yarn add express

EXPOSE 3000

HEALTHCHECK --interval=1m30s --timeout=10s --start-period=30s --retries=3\  
    CMD node test/healthcheck.mjs

CMD ["yarn", "start:prod"]