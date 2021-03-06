import { Action } from '@ngrx/store';
import { Paper } from '../models/paper';
import { type } from '../../utilities';
import { Injectable } from '@angular/core';

export const PaperActionTypes = {
  LOAD: type('[Papers] Load'),
  LOAD_SUCCESS: type('[Paper] Load Success'),
  ADD: type('[Papers] Add'),
  ADD_SUCCESS: type('[Papers] Add Success'),
  SELECT: type('[Paper] Select'),
  SELECT_SUCCESS: type('[Paper] Select Success'),
  SELECT_FAILED: type('[Paper] Select Failed'),
  DESELECT: type('[Paper] Deselect'),
  CACHE: type('[Papers] Cache')
};

@Injectable()
export class PaperActions {
  load(payload: number) {
    return {
      type: PaperActionTypes.LOAD,
      payload
    }
  }
  loadSuccess(payload: Paper[]) {
    return {
      type: PaperActionTypes.LOAD_SUCCESS,
      payload
    };
  }
  select(payload: number): Action {
    return {
      type: PaperActionTypes.SELECT,
      payload
    };
  }
  selectSuccess(payload: Paper): Action {
    return {
      type: PaperActionTypes.SELECT_SUCCESS,
      payload
    };
  }
  selectFailed(): Action {
    return {
      type: PaperActionTypes.SELECT_FAILED,
    };
  }
  deselect(): Action {
    return {
      type: PaperActionTypes.DESELECT
    };
  }

  add(payload: Paper): Action {
    return {
      type: PaperActionTypes.ADD,
      payload
    };
  }
  addSuccess(payload: Paper): Action {
    return {
      type: PaperActionTypes.ADD_SUCCESS,
      payload
    };
  }

}
