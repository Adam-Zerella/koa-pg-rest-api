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
 *     tags: ['Todo']
 *     responses:
 *       200:
 *        $ref: '#/components/responses/listTodo'
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
 *     summary: Find a todo
 *     tags: ['Todo']
 *     responses:
 *       200:
 *         $ref: '#/components/responses/findTodo'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *     parameters:
 *       - $ref: '#/components/parameters/todoId'
 */
router.get(
  '/:todoId',
  // authenticate,
  validate(findByIdSchema),
  handler(findById),
);

/**
 * @openapi
 * /todo:
 *   post:
 *     summary: Create todo
 *     tags: ['Todo']
 *     requestBody:
 *       $ref: '#/components/requestBodies/createTodo'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/createTodo'
 */
router.post(
  '/',
  // authenticate,
  validate(createSchema),
  handler(create),
  // audit,
);

/**
 * @openapi
 * /todo/{todoId}:
 *   put:
 *     summary: Update a todo
 *     tags: ['Todo']
 *     requestBody:
 *       $ref: '#/components/requestBodies/createTodo'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/createTodo'
 *     parameters:
 *       - $ref: '#/components/parameters/todoId'
 */
router.put(
  '/:todoId',
  // authenticate,
  validate(updateSchema),
  handler(update),
  // audit,
);

/**
 * @openapi
 * /todo/{todoId}:
 *   delete:
 *     summary: Delete a todo
 *     tags: ['Todo']
 *     responses:
 *       200:
 *         $ref: '#/components/responses/findTodo'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *     parameters:
 *       - $ref: '#/components/parameters/todoId'
 */
router.delete(
  '/:todoId',
  // authenticate,
  validate(removeSchema),
  handler(remove),
  // audit,
);

export default router;
