import { Action } from '@ngrx/store';
import { Course } from '../models/course';
import { CourseActionTypes } from './course.actions';
import { Dict } from '../models/dict';
import { normalize, Schema, arrayOf } from 'normalizr';

export interface CourseState {
  selectedId: number;
  entities: Dict<Course>;
}

const initalState: CourseState = {
  selectedId: null,
  entities: {}
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
        entities: Object.assign({}, state.entities, action.payload)
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

const courseSchema = new Schema('courses');
const serverSchema = arrayOf(courseSchema);

export function normalizeCourses(courses: Course[]): Dict<Course> {
  return normalize(courses, serverSchema).entities.courses
}

export function denormalizeCourses(courses: Dict<Course>): Course[]{
  return Object.keys(courses).map(key => courses[key])
}

export function getSelectedCourse(state: CourseState): Course{
  return state.entities[state.selectedId]
}
