import { Action } from '@ngrx/store';
import { Question } from '../models/question';
import { AppState } from '../../app-store';
import { Answer } from '../models/answer';
import { AnswerActionTypes } from './answer.actions';
import { Dict } from '../models/dict';

export interface AnswerState {
  entities: Answer[];
}

const initalState: AnswerState = {
  entities: [],
}

export function answerReducer(state = initalState, action: Action): AnswerState {
  switch (action.type) {
    case AnswerActionTypes.LOAD_SUCCESS:
      return {
        entities: action.payload
      }
    case AnswerActionTypes.ADD_SUCCESS:
      return {
        entities: [...state.entities, ...action.payload]
      };

    case AnswerActionTypes.UPDATE_VOTES:
      const oldArray = state.entities.filter(a => action.payload.find((ans: Answer) => ans.id === a.id) == null)
      return {
        entities: [
          ...action.payload,
          ...oldArray
        ]
      };


    default:
      return state;
  }
}


export function getAnswers(answerIds: number[], questions: Dict<Answer>): Answer[]{
  return answerIds.map(id => questions[id]);
}
