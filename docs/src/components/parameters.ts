import { OAS3Definition } from 'swagger-jsdoc';

import findById from './parameters/todo/findById';

export const parameters: OAS3Definition['parameters'] = {
  ...findById,
};
