import { OAS3Definition } from 'swagger-jsdoc';

import todoParams from './todo/parameters';

export const parameters: OAS3Definition['parameters'] = {
  ...todoParams,
  sort: {
    name: 'sort',
    description: 'Filter results by ascending or decending order.',
    required: false,
    in: 'query',
    schema: {
      type: 'string',
      enum: ['asc', 'desc'],
      default: 'asc',
    },
  },
  page: {
    name: 'page',
    description: 'Filter results by a page range',
    required: false,
    in: 'query',
    schema: {
      type: 'integer',
      minimum: 1,
      maximum: 99,
      default: 1,
    },
  },
};
