import { Action } from '@ngrx/store';
import { Question } from '../models/question';
import { QuestionActionTypes } from './question.actions';
import { AppState } from '../../app-store';

export interface QuestionState {
  entities: Question[];
}

const initalState: QuestionState = {
  entities: [],
}

export function questionReducer(state = initalState, action: Action): QuestionState {
  switch (action.type) {

    case QuestionActionTypes.LOAD_SUCCESS:
      return {
        entities: action.payload,
      }

    default:
      return state;
  }
}
