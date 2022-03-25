import { isEmpty } from 'ramda';

import log from '@modules/log';

import {
  list,
  insertOneOrThrow,
  updateOneOrThrow,
  deleteOneOrThrow,
  findOneOrThrow,
} from './persistence';

import type { TodoBody, TodoParam, TodoQuery } from './schemas';
import type { AppContext } from '@modules/koa/types';

const logger = log.getLogger('TodoHandler');

export async function findAll(ctx: AppContext<null, null, TodoQuery>) {
  const { state } = ctx;
  const { query } = state;

  logger.info({ ctx }, `Searching records`);

  const result = await list(query);

  return result;
}

export async function findById(ctx: AppContext<TodoParam>) {
  const { params } = ctx;
  const { todoId } = params;

  logger.info({ ctx }, `Finding record with ID '${todoId}'`);

  const data = await findOneOrThrow(todoId);
  if (isEmpty(data)) {
    return { data: null, statusCode: 404 };
  }

  return { data };
}

export async function create(ctx: AppContext<null, TodoBody>) {
  const { body } = ctx;

  const [data] = await insertOneOrThrow<TodoBody>(body);

  logger.info({ ctx }, `Created record with ID '${data.id}'`);

  return { data };
}

export async function update(ctx: AppContext<TodoParam, TodoBody>) {
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

export async function remove(ctx: AppContext<TodoParam>) {
  const { params } = ctx;
  const { todoId } = params;

  await findOneOrThrow(todoId);

  logger.info({ ctx }, `Deleting record with ID '${todoId}'`);

  const [data] = await deleteOneOrThrow(todoId);

  return { data };
}
