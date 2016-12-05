import { Action } from '@ngrx/store';
import { Exam } from '../models/exam';
import { type } from '../../../util/action-name-helper';

export const ExamActionTypes = {
  LOAD: type('[Exam] Load'),
  LOAD_SUCCESS: type('[Exam] Load Success'),
  ADD: type('[Exam] Add'),
  SELECT: type('[Exam] Select'),
  SELECT_SUCCESS: type('[Exam] Select Success'),
  SELECT_FAILED: type('[Exam] Select Failed'),
  DESELECT: type('[Exam] Deselect'),
  CACHE: type('[Exam] Cache')
};

export class ExamActions {
  select(payload: number): Action {
    return {
      type: ExamActionTypes.SELECT,
      payload
    };
  }

  selectSuccess(payload: Exam): Action {
    return {
      type: ExamActionTypes.SELECT_SUCCESS,
      payload
    };
  }

  selectFailed(): Action {
    return {
      type: ExamActionTypes.SELECT_FAILED
    };
  }

  deselect(): Action {
    return {
      type: ExamActionTypes.DESELECT
    };
  }

  add(payload: Exam): Action {
    return {
      type: ExamActionTypes.ADD,
      payload
    };
  }

  load(payload: number): Action {
    return {
      type: ExamActionTypes.LOAD
    };
  }

  loadSuccess(payload: Exam[]): Action {
    return {
      type: ExamActionTypes.LOAD_SUCCESS,
      payload
    };
  }

  cache(payload: Exam[]): Action {
    return {
      type: ExamActionTypes.CACHE,
      payload
    };
  }
}
