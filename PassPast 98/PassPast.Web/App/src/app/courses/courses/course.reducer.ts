import { Action } from '@ngrx/store';
import { Course } from '../models/course';
import { CourseActionTypes } from './course.actions';

export interface CourseState {
  selected: Course;
  display: Course[];
}

const initalState: CourseState = {
  selected: null,
  display: []
};

export function courseReducer(state = initalState, action: Action): CourseState {
  switch (action.type) {
    case CourseActionTypes.LOAD_SUCCESS:
      return {
        selected: state.selected,
        display: action.payload
      };

    case CourseActionTypes.ADD:
      return {
        selected: state.selected,
        display: [
          ...state.display,
          action.payload
        ]
      };

    case CourseActionTypes.SELECT_SUCCESS:
      return {
        selected: action.payload,
        display: state.display
      };

    case CourseActionTypes.DESELECT:
      return {
        selected: null,
        display: state.display
      };

    default:
      return state;
  }
}
