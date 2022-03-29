import path from 'path';
import { writeFile } from 'fs/promises';

import swaggerJSDoc from 'swagger-jsdoc';

import { version as appVersion } from '../package.json';

import { headers } from './components/headers';
import { tags } from './components/tags';

import type { OAS3Options } from 'swagger-jsdoc';

const todoRoutesPath = path.join('../src/routes/todo/routes.ts');

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
      schemas: {},
    },
    tags,
    //   parameters: {},
    //   responses: {},
    //   examples: {},
    // },
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

console.log(outputData);

createSwaggerSpec(outputData);
