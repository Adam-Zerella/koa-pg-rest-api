/**
 * @TODO Autogenerate this from Yup
 */
export default {
  createTodo: {
    description: 'Creates a single Todo',
    content: {
      'application/json:': {
        schema: {
          allOf: [
            {
              $ref: '#/components/schemas/Response',
            },
            {
              type: 'object',
              properties: {
                data: {
                  type: 'object',
                  $ref: '#/components/schemas/Todo',
                },
              },
            },
          ],
        },
      },
    },
  },

  findTodo: {
    description: 'Returns the Todo',
    content: {
      'application/json': {
        schema: {
          allOf: [
            {
              $ref: '#/components/schemas/Response',
            },
            {
              type: 'object',
              properties: {
                data: {
                  type: 'object',
                  $ref: '#/components/schemas/Todo',
                },
              },
            },
          ],
        },
      },
    },
  },

  listTodo: {
    description: 'Returns an array of todos with pagination metadata.',
    content: {
      'application/json': {
        schema: {
          allOf: [
            {
              $ref: '#/components/schemas/Response',
            },
            {
              type: 'object',
              properties: {
                data: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Todo',
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
};
