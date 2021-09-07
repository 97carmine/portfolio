FROM node:current-alpine as builder

WORKDIR /opt/app

COPY . .

RUN rm /usr/local/bin/yarn /usr/local/bin/yarnpkg \
    && rm -r /opt/yarn-v1.22.5 \
    && npm i -g corepack \
    && yarn config set enableMirror false \
    && yarn config set enableInlineBuilds true \
    && yarn install \
    && yarn build:prod \
    && yarn cache clean

FROM node:lts-alpine

ENV NPM_CONFIG_PREFIX="/home/node/.local"
ENV PATH=$PATH:/home/node/.local/bin
ENV NODE_ENV=production

RUN apk update \
    && apk upgrade \
    && mkdir /home/node/app \
    && chown -R node:node /home/node/app \
    && npm i -g corepack \
    && find /usr/local/bin -type l -regex ".*\(np[mx]\|yarn\|pkg\)" -maxdepth 1 -delete \
    && rm -r /opt/yarn-v1.22.5 /usr/local/lib/node_modules \
    && unset YARN_VERSION

USER node

WORKDIR /home/node/app/

COPY --chown=node:node --from=builder /opt/app/build ./build
COPY --chown=node:node --from=builder /opt/app/package.json \
    /opt/app/.yarnrc.yml /opt/app/.docker/web/healthcheck.mjs ./

RUN yarn plugin import @yarnpkg/plugin-workspace-tools \
    && yarn workspaces focus --production \
    && rm .yarnrc.yml .yarn/install-state.gz \
    && rm -r .yarn/plugins ../.local

EXPOSE 3000

HEALTHCHECK --interval=1m30s --timeout=10s --start-period=30s --retries=3 \
    CMD node healthcheck.mjs

CMD NODE_OPTIONS="--require $(pwd)/.pnp.cjs" node build/server.js
