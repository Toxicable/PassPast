import { Action } from '@ngrx/store';
import { Alert } from './alert.model';
import { AlertActions } from './alert.actions';

const initalState: Alert[] = [];

export function alertReducer(state = initalState, action: Action): Alert[] {
  switch (action.type) {
    case AlertActions.types.ADD:
      return [
        ...state,
        action.payload
      ];

    case AlertActions.types.DELETE:
      return state.filter(alert =>
        alert.message !== action.payload.message
      );

    default:
      return state;
  }
}
