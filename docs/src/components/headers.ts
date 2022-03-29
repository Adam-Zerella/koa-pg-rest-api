import { OAS3Definition } from 'swagger-jsdoc';

export const headers: OAS3Definition['components'] = {
  ['X-Request-ID']: {
    schema: {
      type: 'string',
      format: 'uuid',
    },
    description: 'Unique identifier for every HTTP request involved in operation processing.',
  },
};
