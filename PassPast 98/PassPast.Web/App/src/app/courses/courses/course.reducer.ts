import { Action } from '@ngrx/store';
import { Course } from '../models/course';
import { CourseActionTypes } from './course.actions';

export interface CourseState {
  selected: Course;
  entities: Course[];
}

const initalState: CourseState = {
  selected: null,
  entities: []
};

export function courseReducer(state = initalState, action: Action): CourseState {
  switch (action.type) {
    case CourseActionTypes.LOAD_SUCCESS:
      return {
        selected: state.selected,
        entities: action.payload
      };

    case CourseActionTypes.ADD_SUCCESS:
      return {
        selected: state.selected,
        entities: [
          ...state.entities,
          action.payload
        ]
      };

    case CourseActionTypes.SELECT_SUCCESS:
      return {
        selected: action.payload,
        entities: state.entities
      };

    case CourseActionTypes.DESELECT:
      return {
        selected: null,
        entities: state.entities
      };

    default:
      return state;
  }
}
