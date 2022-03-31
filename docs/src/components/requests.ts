import { OAS3Definition } from 'swagger-jsdoc';

import todoRequests from './todo/requests';

export const requests: OAS3Definition['requestBodies'] = {
  ...todoRequests,
};
