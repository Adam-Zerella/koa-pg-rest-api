import http from 'http';

import Koa from 'koa';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import env from '@modules/env';
import log from '@modules/log';
import { ALLOWED_METHODS } from '@modules/koa/constants';
import router from '@routes/routes';
import requestTrace from '@middleware/trace';
import errorHandler from '@middleware/error';
import routeNotFound from '@middleware/404';

const app = new Koa();
const logger = log.getLogger('Server');

/** So that we swallow thrown errors */
app.silent = true;

app.use(errorHandler());
app.use(helmet());
app.use(requestTrace());
app.use(routeNotFound());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    allowMethods: ALLOWED_METHODS,
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length', 'Date', 'X-Request-ID'],
  }),
);
app.use(bodyParser());
app.use(router.routes());

const server = http.createServer(app.callback());

/**
 * Best practice for gracefully shutting down the Node process,
 * avoids dangling ports and connections.
 */
async function closeGracefully() {
  logger.info('SIGINT recieved, gracefully shutting down...');
  await server.close();
  process.exit();
}
process.on('SIGINT', closeGracefully);

server.listen(env.PORT);

logger.info(`Server started and is listening at: http://0.0.0.0:${env.PORT}`);
