import { Action } from '@ngrx/store';
import { type } from '../../utilities';
import { Alert } from './alert.model';

export class AlertActions {
  static types = {
    ADD: type('[Alert] Add'),
    DELETE: type('[Alert] Delete')
  };
  static add(payload: Alert): Action {
    return {
      type: this.types.ADD,
      payload
    };
  }
  static delete(payload: Alert): Action {
    return {
      type: this.types.DELETE,
      payload
    };
  }
}
