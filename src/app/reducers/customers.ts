import { Customer } from '../shared';
import * as customers from '../actions/customers';

export interface State {
  loading: boolean;
  list: Customer[];
}

export const initialState: State = {
  loading: false,
  list: []
};

export function reducer(
  state = initialState,
  action: customers.Actions
): State {
  switch (action.type) {
    case customers.REQUEST: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case customers.SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        list: action.payload
      });
    }

    default: {
      return state;
    }
  }
}
