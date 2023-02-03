FROM alpine/git:latest as repo

WORKDIR /opt

RUN git clone https://github.com/97carmine/portfolio.git

FROM denoland/deno:alpine

RUN apk update --no-cache \
    && sh -l -c 'echo export DENO_DEPLOYMENT_ID="$(echo $RANDOM | md5sum | head -c 20)" > /etc/profile.d/docker_init.sh'

USER deno

WORKDIR /home/deno/app/

COPY --from=repo --chown=deno:deno /opt/web .
COPY --from=repo --chown=deno:deno /opt/.docker/web/healthcheck.ts .

RUN sed -i 's/"healthcheck": "deno run --allow-net ..\/.docker\/web\/healthcheck.ts"/"healthcheck": "deno run --allow-net healthcheck.ts"/g' deno.json \
    && deno cache main.ts

EXPOSE 8000

HEALTHCHECK --interval=1m30s --timeout=10s --start-period=30s --retries=3 \
    CMD deno task healthcheck

CMD run -A --allow-net --allow-read --allow-env --allow-write --allow-run main.ts
