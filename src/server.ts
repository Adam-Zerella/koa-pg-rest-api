import Koa from 'koa';
import helmet from 'koa-helmet';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import env from '@modules/env';
import log from '@modules/log';
import router from '@routes/routes';
import requestTrace from '@middleware/trace';
import errorHandler from '@middleware/error';

const app = new Koa();
const logger = log.getLogger('Server');

/** So that we swallow thrown errors */
app.silent = true;

app.use(errorHandler());
app.use(helmet());
app.use(requestTrace());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    allowMethods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length', 'Date', 'X-Request-ID'],
  }),
);
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(env.PORT);

logger.info(`Server started and is listening at: http://0.0.0.0:${env.PORT}`);
