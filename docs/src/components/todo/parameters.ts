/**
 * @TODO Autogenerate this from Yup
 */
export default {
  todoId: {
    name: 'todoId',
    description: 'Unique ID of the element',
    required: true,
    in: 'path',
    schema: {
      type: 'string',
      format: 'uuid',
    },
  },
};
