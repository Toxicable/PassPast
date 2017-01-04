import { Action } from '@ngrx/store';
import { Course } from '../models/course';
import { type } from '../../utilities';

export const CourseActionTypes = {
  LOAD: type('[Course] Load'),
  LOAD_SUCCESS: type('[Course] Load Success'),
  ADD: type('[Course] Add'),
  ADD_SUCCESS: type('[Course] Add Success'),
  SELECT: type('[Course] Select'),
  SELECT_SUCCESS: type('[Course] Select Success'),
  SELECT_FAILED: type('[Course] Select Failed'),
  DESELECT: type('[Course] Deselect')
}

export class CourseActions {
  deselect(): Action{
    return {
      type: CourseActionTypes.DESELECT
    }
  }

  select(payload: number): Action {
    return {
      type: CourseActionTypes.SELECT,
      payload
    };
  }
  selectSuccess(payload: Course): Action {
    return {
      type: CourseActionTypes.SELECT_SUCCESS,
      payload
    };
  }
  selectFailed(): Action {
    return {
      type: CourseActionTypes.SELECT_SUCCESS
    };
  }

  add(payload: Course): Action {
    return {
      type: CourseActionTypes.ADD,
      payload
    };
  }
  addSuccess(payload: Course): Action {
    return {
      type: CourseActionTypes.ADD_SUCCESS,
      payload
    };
  }

  load(): Action {
    return {
      type: CourseActionTypes.LOAD
    };
  }

  loadSuccess(payload: Course[]): Action {
    return {
      type: CourseActionTypes.LOAD_SUCCESS,
      payload
    };
  }
}
