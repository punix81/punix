import { Action } from '@ngrx/store';
import { Customer } from '../shared';

export const REQUEST = '[Customers] Request';
export const SUCCESS = '[Customers] Success';

export class RequestAction implements Action {
  readonly type = REQUEST;
}

export class SuccessAction implements Action {
  readonly type = SUCCESS;

  constructor(public payload: Customer[]) {}
}

export type Actions = RequestAction | SuccessAction;
