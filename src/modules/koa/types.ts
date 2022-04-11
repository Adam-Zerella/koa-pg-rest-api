import type { DefaultState, ParameterizedContext } from 'koa';

interface TodoState<RequestQuery> extends DefaultState {
  rquid: string;
  query: RequestQuery;
  log: any;
}

export interface AppContext<RequestParams = unknown, RequestBody = unknown, RequestQuery = unknown>
  extends ParameterizedContext {
  params: RequestParams;
  body: RequestBody;
  state: TodoState<RequestQuery>;
}
