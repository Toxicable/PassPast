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

    case CommentActionTypes.LOAD_SUCCESS:
      return {
        entities: action.payload,
      }

    default:
      return state;
  }
}
