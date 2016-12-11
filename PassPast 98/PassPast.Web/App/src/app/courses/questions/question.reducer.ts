import { Action } from '@ngrx/store';
import { Question } from '../models/question';
import { QuestionActionTypes } from './question.actions';
import { AppState } from '../../app-store';

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
    case QuestionActionTypes.ADD_ANSWER:
      return {
        display: state.display,
        cache: state.cache
      }

    default:
      return state;
  }
}


export const getDisplayed = (questions: Question[]) => {

  let objs: any = {};
  questions.forEach(q => objs[q.id] = q);

  let nonNulls = questions.filter(val => !!val.parentQuestionId)
  nonNulls.forEach(q => objs[q.parentQuestionId].subQuestions.push(q))

  return questions.filter(val => !val.parentQuestionId);

}
