import './helpers/fakeEnv';

import todoPersistence from '../src/routes/todo/__tests__/persistence.test';
import todoHandlers from '../src/routes/todo/__tests__/handlers.test';

describe('Suite', function () {
  describe('Todo', async function () {
    todoPersistence();
    todoHandlers();
  });
});
