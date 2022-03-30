import { OAS3Definition } from 'swagger-jsdoc';

import { components as generatedSchemas } from './types.json';

import ResponseSchema from './schemas/response';

export const schemas: OAS3Definition['schemas'] = {
  ...ResponseSchema,
  ...generatedSchemas.schemas,
};
