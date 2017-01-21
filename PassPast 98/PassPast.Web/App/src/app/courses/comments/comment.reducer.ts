import { Action } from '@ngrx/store';
import { Question } from '../models/question';
import { AppState } from '../../app-store';
import { Comment } from '../models/comment';
import { CommentActionTypes } from './comment.actions';
import { Dict } from '../models/dict';

export interface CommentState {
  entities: Comment[];
}

const initalState: CommentState = {
  entities: [],
};

export function commentReducer(state = initalState, action: Action): CommentState {
  switch (action.type) {

    case CommentActionTypes.ADD_SUCCESS:
    case CommentActionTypes.LOAD_SUCCESS:
      return {
        entities: [...state.entities, ...action.payload]
      };

    case CommentActionTypes.UPDATE_VOTES:
      const oldIndex = state.entities.findIndex(c => c.id === action.payload.id);
      return {
        entities: [
          ...state.entities.slice(0, oldIndex),
          action.payload,
          ...state.entities.slice(oldIndex + 1)
        ]
      };

    default:
      return state;
  }
}
