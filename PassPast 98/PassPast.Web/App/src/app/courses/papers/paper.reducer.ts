import { Action } from '@ngrx/store';
import { Paper } from '../models/paper';
import { PaperActionTypes } from './paper.actions';
import { CoursesState } from '../courses.store';
import { Course } from '../models/course';

export interface PaperState {
  entities: Paper[];
  selected: Paper;
}

const initalState: PaperState = {
  entities: [],
  selected: null
};

export function paperReducer(state = initalState, action: Action): PaperState {
  switch (action.type) {
    case PaperActionTypes.LOAD_SUCCESS:
      return {
        selected: state.selected,
        entities: [
          ...state.entities,
          ...action.payload
        ]
      };

    case PaperActionTypes.ADD_SUCCESS:
      return {
        selected: state.selected,
        entities: [
          ...state.entities,
          action.payload
        ]
      };

    case PaperActionTypes.SELECT_SUCCESS:
      return {
        selected: action.payload,
        entities: state.entities
      };

    case PaperActionTypes.DESELECT:
      return {
        selected: null,
        entities: state.entities
      };

    default:
      return state;
  }
}

export function getSelectedPapers(paperEntities: Paper[], course: Course): Paper[]{
  if(course == null) { return [] }
  return paperEntities.filter(p => p.courseId == course.id)
}
