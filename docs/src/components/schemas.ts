import { OAS3Definition } from 'swagger-jsdoc';

import { components as generatedSchemas } from '../../dist/types.json';

const ResponseSchema = {
  type: 'object',
  required: ['data'],
  properties: {
    data: {
      type: 'object',
      nullable: true,
    },
    meta: {
      type: 'object',
    },
  },
};

export const schemas: OAS3Definition['schemas'] = {
  Response: ResponseSchema,
  ...generatedSchemas.schemas,
};
