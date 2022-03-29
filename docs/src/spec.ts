import path from 'path';
import { writeFile } from 'fs/promises';

import swaggerJSDoc from 'swagger-jsdoc';

import { version as appVersion } from '../package.json';

import { headers } from './components/headers';
import { tags } from './components/tags';

import type { OAS3Options } from 'swagger-jsdoc';

const options: OAS3Options = {
  apis: [path.join(__dirname, '../src/routes/todo/handlers.ts')],
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Docs',
      version: appVersion,
      description: 'Sample API',
    },
    components: {
      headers,
      parameters: {},
      responses: {},
      schemas: {},
      examples: {},
    },
    tags,
    paths: {
      '/todo': {
        get: {
          tags: ['Todo'],
          summary: 'List todos',
          responses: {
            200: {
              $ref: '#/responses/listTodo',
            },
          },
        },
      },
      '/todo/{todoId}': {
        tags: ['Todo'],
        get: {
          summary: 'Find todo by ID',
          responses: {
            200: {
              $ref: '#/responses/findTodo',
            },
          },
        },
      },
    },
  },
};

const swaggerSpec = swaggerJSDoc(options);

async function createSwaggerSpec(fileData: string) {
  try {
    const outputPath = path.join('swagger.json');

    await writeFile(outputPath, fileData, 'utf-8');
  } catch (err) {
    console.error(err);
  }
}

const outputData = JSON.stringify(swaggerSpec, null, 4);

createSwaggerSpec(outputData);
