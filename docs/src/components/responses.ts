import { OAS3Definition } from 'swagger-jsdoc';

// import createTodo from './responses/todo/create';

export const responses: OAS3Definition['responses'] = {
  NotFound: {
    description: 'Not found',
  },
  // ...createTodo,
};
