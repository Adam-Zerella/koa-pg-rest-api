export default {
  Response: {
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
  },
};
