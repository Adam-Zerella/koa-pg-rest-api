import { OAS3Definition } from 'swagger-jsdoc';

import todoParams from './todo/parameters';

export const parameters: OAS3Definition['parameters'] = {
  ...todoParams,
};
