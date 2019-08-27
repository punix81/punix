import { ActionReducerMap } from '@ngrx/store';

import * as fromCustomers from './customers';

export interface State {
  customers: fromCustomers.State;
}

export const reducers: ActionReducerMap<State> = {
  customers: fromCustomers.reducer
};
