# Build it
FROM docker.io/node:lts-alpine AS builder
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY src ./src
RUN yarn install --frozen-lockfile
RUN yarn build
RUN yarn install --production --frozen-lockfile

# Run it
FROM docker.io/node:lts-alpine
WORKDIR /opt/app
RUN apk upgrade --no-cache
COPY --from=builder --chown=node:node node_modules ./node_modules
COPY --from=builder --chown=node:node dist ./dist
COPY --from=builder --chown=node:node package.json .
ENV NODE_ENV production
USER node
HEALTHCHECK --interval=5m --timeout=5s \
    CMD curl --fail http://127.0.0.1:5000/health || exit 1
CMD [ "node", "dist/server.js" ]
