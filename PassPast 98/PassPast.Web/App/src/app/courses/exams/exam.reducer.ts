import { Action } from '@ngrx/store';
import { Exam } from '../models/exam';
import { ExamActionTypes } from './exam.actions';

export interface ExamState {
  selected: Exam;
  entities: Exam[];
}

const initalState: ExamState = {
  selected: null,
  entities: []
};

export function examReducer(state = initalState, action: Action): ExamState {
  switch (action.type) {
    case ExamActionTypes.LOAD_SUCCESS:
      return {
        selected: state.selected,
        entities: action.payload
      };

    case ExamActionTypes.ADD:
      return {
        selected: state.selected,
        entities: [
          ...state.entities,
          action.payload
        ]
      };

    case ExamActionTypes.SELECT_SUCCESS:
      return {
        selected: action.payload,
        entities: state.entities
      };

    case ExamActionTypes.DESELECT:
      return {
        selected: null,
        entities: state.entities
      };

    default:
      return state;
  }
};

export function getSelectedExams(examEntities: Exam[], exam: Exam): Exam[]{
  if(exam == null) { return [] }
  return examEntities.filter(e => e.paperId == exam.id)
}
