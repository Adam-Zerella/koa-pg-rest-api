import { pino } from 'pino';

import env from '@modules/env';

import type { AppContext } from '@modules/koa/types';

const isTest = env.NODE_ENV === 'test';
const isDevelopment = env.NODE_ENV === 'development';

function getLogger(name: string) {
  return pino({
    level: env.LOG_LEVEL,
    name,
    enabled: !isTest,
    serializers: {
      ctx: ({ state, header }: AppContext) => ({
        rquid: state.rquid,
        agent: header['user-agent'],
      }),
      err: (err) => ({
        name: err.name,
        message: err.message,
        stack: err.stack,
        type: err.type,
      }),
    },
    ...(isDevelopment && {
      transport: {
        pipeline: [
          {
            target: 'pino-pretty',
          },
        ],
      },
    }),
  });
}

export default {
  getLogger,
};
