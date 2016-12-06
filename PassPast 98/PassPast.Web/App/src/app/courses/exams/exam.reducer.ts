import { Action } from '@ngrx/store';
import { Exam } from '../models/exam';
import { ExamActionTypes } from './exam.actions';

export interface ExamState {
  selected: Exam;
  cache: Exam[];
  display: Exam[];
}

const initalState: ExamState = {
  selected: null,
  cache: [],
  display: []
};

export function examReducer(state = initalState, action: Action): ExamState {
  switch (action.type) {
    case ExamActionTypes.LOAD_SUCCESS:
      return {
        selected: state.selected,
        display: action.payload,
        cache: state.cache
      };

    case ExamActionTypes.ADD:
      return {
        selected: state.selected,
        cache: state.cache,
        display: [
          ...state.display,
          action.payload
        ]
      };

    case ExamActionTypes.SELECT_SUCCESS:
      return {
        selected: action.payload,
        cache: state.cache,
        display: state.display
      };

    case ExamActionTypes.DESELECT:
      return {
        selected: null,
        cache: state.cache,
        display: state.display
      };

    case ExamActionTypes.CACHE:
      return {
        selected: state.selected,
        display: state.display,
        cache: [
          ...state.cache,
          ...action.payload
        ],

      }

    default:
      return state;
  }
};
