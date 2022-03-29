import Router from '@koa/router';

import validate from '@middleware/validate';
import handler from '@middleware/handler';

import { findAll, findById, create, update, remove } from './handlers';
import { findAllSchema, findByIdSchema, createSchema, updateSchema, removeSchema } from './schemas';

const router = new Router();

/**
 * @openapi
 * /todo:
 *   get:
 *     summary: List all todos
 *     tags: [Todo]
 *     responses:
 *       200:
 *         description: Returns an array of todos with pagination.
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ArrayOfTodo
 */
router.get(
  '/',
  // authenticate,
  validate(findAllSchema),
  handler(findAll),
);

/**
 * @openapi
 * /todo/{todoId}:
 *   get:
 *     summary: Find one todo
 *     tags: [Todo]
 *     responses:
 *       200:
 *         description: Returns a single Todo
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Todo
 */
router.get(
  '/:todoId',
  // authenticate,
  validate(findByIdSchema),
  handler(findById),
);

router.post(
  '/',
  // authenticate,
  validate(createSchema),
  handler(create),
  // audit,
);

router.put(
  '/:todoId',
  // authenticate,
  validate(updateSchema),
  handler(update),
  // audit,
);

router.delete(
  '/:todoId',
  // authenticate,
  validate(removeSchema),
  handler(remove),
  // audit,
);

export default router;
