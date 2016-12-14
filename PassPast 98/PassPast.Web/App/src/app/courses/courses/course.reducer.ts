import { Action } from '@ngrx/store';
import { Course } from '../models/course';
import { CourseActionTypes } from './course.actions';

export interface CourseState {
  selectedId: number;
  entities: Course[];
}

const initalState: CourseState = {
  selectedId: null,
  entities: []
};

export function courseReducer(state = initalState, action: Action): CourseState {
  switch (action.type) {
    case CourseActionTypes.LOAD_SUCCESS:
      return {
        selectedId: state.selectedId,
        entities: action.payload
      };

    case CourseActionTypes.ADD_SUCCESS:
      return {
        selectedId: state.selectedId,
        entities: [
          ...state.entities,
          action.payload
        ]
      };

    case CourseActionTypes.SELECT_SUCCESS:
      return {
        selectedId: action.payload,
        entities: state.entities
      };

    case CourseActionTypes.DESELECT:
      return {
        selectedId: null,
        entities: state.entities
      };

    default:
      return state;
  }
}

export function getSelectedCourse(state: CourseState){
  return state.entities.find(c => c.id == state.selectedId)
}
