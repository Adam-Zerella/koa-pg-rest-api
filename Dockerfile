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
RUN apk -U add --no-cache
COPY --from=builder --chown=1000:node node_modules/ ./node_modules
COPY --from=builder --chown=1000:node dist/ ./dist
COPY --from=builder --chown=1000:node package.json ./
HEALTHCHECK CMD curl --fail http://127.0.0.1:5000/v1/healthzzz || exit 1
CMD [ "node", "dist/server.js" ]
