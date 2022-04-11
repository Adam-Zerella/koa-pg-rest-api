# Build it
FROM docker.io/node:lts-alpine AS builder
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY src ./src
RUN yarn install --pure-lockfile
RUN yarn build
RUN yarn install --production --pure-lockfile

# Run it
FROM docker.io/node:lts-alpine
WORKDIR /opt/app
RUN apk upgrade --no-cache
USER node
COPY --from=builder --chown=node:node node_modules ./node_modules
COPY --from=builder --chown=node:node dist ./dist
COPY --from=builder --chown=node:node package.json .
HEALTHCHECK --interval=5m --timeout=5s \
    CMD curl --fail http://127.0.0.1:5000/health || exit 1
CMD [ "node", "dist/server.js" ]
