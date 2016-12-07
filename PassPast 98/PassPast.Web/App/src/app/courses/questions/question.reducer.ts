import { Action } from '@ngrx/store';
import { Question } from '../models/question';
import { QuestionActionTypes } from './question.actions';

export interface QuestionState {
  display: Question[];
  cache: Question[];
}

const initalState: QuestionState = {
  display: [],
  cache: []
}

export function questionReducer(state = initalState, action: Action): QuestionState {
  switch (action.type) {

    case QuestionActionTypes.LOAD_SUCCESS:
      return {
        display: action.payload,
        cache: state.cache
      }

    case QuestionActionTypes.CACHE:
      return {
        display: state.display,
        cache: [
          ...state.cache,
          ...action.payload
        ],
      }

    default:
      return state;
  }
}
