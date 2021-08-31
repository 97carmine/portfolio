FROM node:current-alpine as builder

WORKDIR /opt/app

COPY . .

RUN rm /usr/local/bin/yarn /usr/local/bin/yarnpkg \
    && rm -r /opt/yarn-v1.22.5 \
    && npm i -g corepack \
    && echo "enableMirror: false" >> .yarnrc.yml \
    && yarn install \
    && yarn build:prod \
    && yarn cache clean

FROM node:lts-alpine

RUN mkdir /home/node/app && chown -R node:node /home/node/app \
    && rm /usr/local/bin/yarn /usr/local/bin/yarnpkg \
    && rm -r /opt/yarn-v1.22.5 \
    && npm i -g corepack

USER node

WORKDIR /home/node/app/

COPY --chown=node:node --from=builder /opt/app/build ./build
COPY --chown=node:node --from=builder /opt/app/package.json \
    /opt/app/.yarnrc.yml /opt/app/.docker/web/healthcheck.mjs ./

RUN yarn plugin import @yarnpkg/plugin-workspace-tools \
    && yarn workspaces focus --production \
    && yarn plugin remove @yarnpkg/plugin-workspace-tools \
    && rm -r .yarn/plugins

EXPOSE 3000

HEALTHCHECK --interval=1m30s --timeout=10s --start-period=30s --retries=3 \
    CMD node healthcheck.mjs

CMD NODE_OPTIONS="--require $(pwd)/.pnp.cjs" node build/server.js
