import { Action } from '@ngrx/store';
import { Question } from '../models/question';
import { AppState } from '../../app-store';
import { Answer } from '../models/answer';
import { AnswerActionTypes } from './answer.actions';
import { Dict } from '../models/dict';

export interface AnswerState {
  entities: Dict<Answer>;
}

const initalState: AnswerState = {
  entities: {},
}

export function answerReducer(state = initalState, action: Action): AnswerState {
  switch (action.type) {

    case AnswerActionTypes.ADD_SUCCESS:
    console.log(Object.assign({}, state.entities, action.payload))
      return {
        entities: Object.assign({}, state.entities, action.payload)
      }

    case AnswerActionTypes.LOAD_SUCCESS:
      return {
        entities: action.payload,
      }


    default:
      return state;
  }
}


export function getAnswers(answerIds: number[], questions: Dict<Answer>): Answer[]{

  return answerIds.map(id => questions[id])
}
