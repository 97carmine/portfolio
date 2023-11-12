FROM alpine/git:latest as repo

ENV DENO_DEPLOYMENT_ID=true

WORKDIR /opt

RUN git clone --depth 1 -b fresh --single-branch https://github.com/97carmine/portfolio

FROM denoland/deno:alpine

RUN apk update --no-cache

USER deno

WORKDIR /home/deno/app/

COPY --from=repo --chown=deno:deno /opt/portfolio/web .
COPY --from=repo --chown=deno:deno /opt/portfolio/.docker/web/healthcheck.ts .

RUN sed -i 's/"healthcheck": "deno run --allow-net ..\/.docker\/web\/healthcheck.ts"/"healthcheck": "deno run --allow-net healthcheck.ts"/g' deno.json \
    && deno cache main.ts

EXPOSE 8000

HEALTHCHECK --interval=1m30s --timeout=10s --start-period=30s --retries=3 \
    CMD deno task healthcheck

CMD ["run", "--allow-net","--allow-read","--allow-env","--allow-write","--allow-run","main.ts"]
