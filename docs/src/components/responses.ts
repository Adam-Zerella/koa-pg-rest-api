import { OAS3Definition } from 'swagger-jsdoc';

import todoResponses from './todo/responses';

export const responses: OAS3Definition['responses'] = {
  NotFound: {
    description: 'No data found',
  },
  ...todoResponses,
};
