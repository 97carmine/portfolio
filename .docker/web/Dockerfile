FROM node:lts-alpine as builder

WORKDIR /opt/app

COPY . .

RUN npm rm -g npm \
    && rm /usr/local/bin/yarn /usr/local/bin/yarnpkg \
    && rm -r /opt/yarn-v${YARN_VERSION} \
    && corepack enable \
    && yarn config set enableMirror false \
    && yarn config set enableInlineBuilds true \
    && yarn install \
    && yarn build:prod \
    && yarn cache clean

FROM node:lts-alpine

ENV NODE_ENV=production

RUN npm rm -g npm \
    && rm /usr/local/bin/yarn /usr/local/bin/yarnpkg \
    && rm -r /opt/yarn-v${YARN_VERSION} \
    && corepack enable \
    && apk update \
    && apk upgrade \
    && mkdir /home/node/app \
    && chown -R node:node /home/node/app

USER node

WORKDIR /home/node/app/

COPY --chown=node:node --from=builder /opt/app/build ./build
COPY --chown=node:node --from=builder /opt/app/package.json \
    /opt/app/.yarnrc.yml /opt/app/.docker/web/healthcheck.mjs ./

RUN yarn plugin import @yarnpkg/plugin-workspace-tools \
    && yarn workspaces focus --production \
    && rm .yarnrc.yml .yarn/install-state.gz \
    && rm -r .yarn/plugins

EXPOSE 3000

HEALTHCHECK --interval=1m30s --timeout=10s --start-period=30s --retries=3 \
    CMD node healthcheck.mjs

CMD node --require=$(pwd)/.pnp.cjs build/server.js
