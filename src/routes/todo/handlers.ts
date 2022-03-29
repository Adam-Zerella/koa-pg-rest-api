import { isEmpty } from 'ramda';

import log from '@modules/log';
import { HandlerFnResult } from '@middleware/handler';

import {
  list,
  insertOneOrThrow,
  updateOneOrThrow,
  deleteOneOrThrow,
  findOneOrThrow,
} from './persistence';
import { Todo } from './types';

import type { AppContext } from '@modules/koa/types';
import type { TodoBody, TodoParam, TodoQuery } from './schemas';

const logger = log.getLogger('TodoHandler');

/**
 * @swagger
 * /:
 *  get:
 *    description: List all todos
 *    produces:
 *      - application/json
 */
export async function findAll(
  ctx: AppContext<null, null, TodoQuery>,
): Promise<HandlerFnResult<Todo[]>> {
  const { state } = ctx;
  const { query } = state;

  logger.info({ ctx }, `Searching records`);

  const { data, meta } = await list(query);

  return { data, meta };
}

export async function findById(ctx: AppContext<TodoParam>): Promise<HandlerFnResult<Todo>> {
  const { params } = ctx;
  const { todoId } = params;

  logger.info({ ctx }, `Finding record with ID '${todoId}'`);

  const data = await findOneOrThrow(todoId);
  if (isEmpty(data)) {
    return { data: null, statusCode: 404 };
  }

  return { data };
}

export async function create(ctx: AppContext<null, TodoBody>): Promise<HandlerFnResult<Todo>> {
  const { body } = ctx;

  const [data] = await insertOneOrThrow<TodoBody>(body);

  logger.info({ ctx }, `Created record with ID '${data.id}'`);

  return { data, statusCode: 201 };
}

export async function update(ctx: AppContext<TodoParam, TodoBody>): Promise<HandlerFnResult<Todo>> {
  const { body, params } = ctx;
  const { todoId } = params;

  const data = await findOneOrThrow(todoId);
  if (isEmpty(data)) {
    return { data: null, statusCode: 404 };
  }

  logger.info({ ctx }, `Updating record with ID '${todoId}'`);

  const [result] = await updateOneOrThrow<TodoBody>(todoId, body);

  return { data: result };
}

export async function remove(ctx: AppContext<TodoParam>): Promise<HandlerFnResult<Todo>> {
  const { params } = ctx;
  const { todoId } = params;

  await findOneOrThrow(todoId);

  logger.info({ ctx }, `Deleting record with ID '${todoId}'`);

  const [data] = await deleteOneOrThrow(todoId);

  return { data };
}
