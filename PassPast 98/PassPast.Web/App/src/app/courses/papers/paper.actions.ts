import { Action } from '@ngrx/store';
import { Paper } from '../models/paper';
import { type } from '../../../util/action-name-helper';
import { Injectable } from '@angular/core';
import { Dict } from '../models/dict';

export const PaperActionTypes = {
  LOAD: type('[Papers] Load'),
  LOAD_SUCCESS: type('[Paper] Load Success'),
  ADD: type('[Papers] Add'),
  ADD_SUCCESS: type('[Papers] Add Success'),
  SELECT: type('[Paper] Select'),
  SELECT_SUCCESS: type('[Paper] Select Success'),
  SELECT_FAILED: type('[Paper] Select Failed'),
  DESELECT: type('[Paper] Deselect'),
};

@Injectable()
export class PaperActions {
  load(payload: number) {
    return {
      type: PaperActionTypes.LOAD,
      payload
    }
  }
  loadSuccess(payload: Dict<Paper>) {
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
  addSuccess(payload: Dict<Paper>): Action {
    return {
      type: PaperActionTypes.ADD_SUCCESS,
      payload
    };
  }
}
