export default {
  createTodo: {
    description: 'Todo object',
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Todo',
        },
      },
    },
  },
};
