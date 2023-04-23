# Stage 1: Full install of the app
FROM node:16-alpine as base
ENV NODE_ENV=production
WORKDIR /app

COPY package.json package.json
COPY web/package.json web/package.json
COPY api/package.json api/package.json
COPY yarn.lock yarn.lock
COPY .yarnrc.yml .yarnrc.yml
COPY .yarn/releases .yarn/releases

RUN apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python


RUN --mount=type=cache,target=/root/.yarn/berry/cache \
    --mount=type=cache,target=/root/.cache yarn install --immutable --inline-builds

COPY redwood.toml .
COPY graphql.config.js .

# Stage 2: Generate web build with selected env variables
FROM base as web_build
# TODO: To make includeEnvironmentVariables work, setup ENV here

COPY web web
RUN yarn rw build web

# Stage 3: Generate api build
FROM base as api_build
COPY api api
RUN yarn rw build api

# Stage 4: Only install API packages to keep image small and keep cache separate
FROM node:16-alpine
ENV NODE_ENV=production
WORKDIR /app

COPY api/package.json .
COPY .yarn/releases .yarn/releases
COPY yarn.lock .
COPY .yarnrc.yml .
COPY graphql.config.js .
COPY redwood.toml .

RUN apk add --update --no-cache python3 build-base gcc && ln -sf /usr/bin/python3 /usr/bin/python

RUN --mount=type=cache,target=/root/.yarn/berry/cache \
    --mount=type=cache,target=/root/.cache yarn install --inline-builds && yarn add react react-dom @redwoodjs/api-server @redwoodjs/internal prisma

COPY --from=web_build /app/web/dist /app/web/dist
COPY --from=api_build /app/api/dist /app/api/dist
COPY --from=api_build /app/api/db /app/api/db
COPY --from=api_build /app/node_modules/.prisma /app/node_modules/.prisma

CMD [ "node_modules/.bin/rw-server" ]
