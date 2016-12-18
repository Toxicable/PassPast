import { Action } from '@ngrx/store';
import { Question } from '../models/question';
import { AppState } from '../../app-store';
import { Comment } from '../models/comment';
import { CommentActionTypes } from './comment.actions';
import { Dict } from '../models/dict';

export interface CommentState {
  entities: Dict<Comment>;
}

const initalState: CommentState = {
  entities: {},
}

export function commentReducer(state = initalState, action: Action): CommentState {
  switch (action.type) {

    case CommentActionTypes.UPDATE_VOTES:
    case CommentActionTypes.ADD_SUCCESS:
      return {
        entities: Object.assign({}, state.entities, action.payload)
      };

    case CommentActionTypes.LOAD_SUCCESS:
      return {
        entities: action.payload,
      };

    default:
      return state;
  }
}

export function getComments(answerIds: number[], questions: Dict<Comment>): Comment[] {
  return answerIds.map(id => questions[id])
}
