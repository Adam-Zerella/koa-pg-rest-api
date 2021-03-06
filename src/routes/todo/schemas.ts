import { object, string, number, InferType } from 'yup';

import { SORT_DIRECTION } from '@modules/db/constants';

export type TodoParam = InferType<typeof findByIdSchema['param']>;
export type TodoBody = InferType<typeof createSchema['body']>;
export type TodoQuery = InferType<typeof findAllSchema['query']>;

export const findAllSchema = {
  query: object({
    page: number().min(1).default(1).max(99).typeError('Page paramater must be a valid number.'),
    sort: string().oneOf(SORT_DIRECTION).default('asc'),
  }),
};

export const findByIdSchema = {
  param: object({
    todoId: string().uuid().required(),
  }),
};

export const createSchema = {
  body: object({
    label: string().required().typeError('Label must be a string or number.'),
  }),
};

export const updateSchema = {
  param: object({
    todoId: string().uuid().required(),
  }),
  body: object({
    label: string().typeError('Label must be a string or number.'),
  }),
};

export const removeSchema = {
  param: object({
    todoId: string().uuid().required(),
  }),
};
