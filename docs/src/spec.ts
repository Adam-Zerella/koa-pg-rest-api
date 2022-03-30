import path from 'path';
import { writeFile } from 'fs/promises';

import swaggerJSDoc from 'swagger-jsdoc';

import { version as appVersion } from '../package.json';

import { schemas } from './components/schemas';
import { headers } from './components/headers';
import { tags } from './components/tags';
import { responses } from './components/responses';
import { parameters } from './components/parameters';
import { requests as requestBodies } from './components/requests';

import type { OAS3Options } from 'swagger-jsdoc';

const todoRoutesPath = path.resolve(__dirname, '../../../src/routes/todo/routes.ts');

const options: OAS3Options = {
  apis: [todoRoutesPath],
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Docs',
      version: appVersion,
      description: 'Sample API',
    },
    components: {
      headers,
      schemas,
      parameters,
      responses,
      requestBodies,
    },
    tags,
  },
};

async function createSwaggerSpec() {
  try {
    const swaggerSpec = swaggerJSDoc(options);

    console.log(swaggerSpec);

    const outputPath = path.resolve(__dirname, '../swagger.json');
    const outputData = JSON.stringify(swaggerSpec, null, 4);

    await writeFile(outputPath, outputData, { encoding: 'utf-8' });
  } catch (err) {
    console.error(err);
  }
}

createSwaggerSpec();
