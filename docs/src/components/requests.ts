import { OAS3Definition } from 'swagger-jsdoc';

import create from './requests/todo/create';

export const requests: OAS3Definition['requestBodies'] = {
  ...create,
};
