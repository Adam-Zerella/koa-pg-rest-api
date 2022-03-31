import path from 'path';
import { writeFile } from 'fs/promises';

import swaggerJSDoc from 'swagger-jsdoc';

import { version as appVersion } from '../package.json';

import { schemas } from './components/schemas';
import { headers } from './components/headers';
import { responses } from './components/responses';
import { parameters } from './components/parameters';
import { requests as requestBodies } from './components/requests';

import type { OAS3Options } from 'swagger-jsdoc';

const todoRoutesPath = path.resolve(__dirname, '../../../src/routes/todo/routes.ts');

const options: OAS3Options = {
  apis: [todoRoutesPath],
  definition: {
    openapi: '3.0.0',
    externalDocs: {
      url: 'http://example.com',
      description: 'API Documentation for the Todo web app.',
    },
    info: {
      title: 'Todo API Docs',
      version: appVersion,
      description: 'This is sample documentation for the Todo web app.',
    },
    components: {
      headers,
      schemas,
      parameters,
      responses,
      requestBodies,
    },
    tags: [
      {
        name: 'Todo',
        description: 'Everything about todos',
      },
    ],
  },
};

async function generateSwaggerSpec() {
  try {
    const swaggerSpec = swaggerJSDoc(options);

    const outputPath = path.resolve(__dirname, '../swagger.json');
    const outputData = JSON.stringify(swaggerSpec, null, 4);

    await writeFile(outputPath, outputData, { encoding: 'utf-8' });
  } catch (err) {
    console.error(err);
  }
}

generateSwaggerSpec();
