import { Action } from '@ngrx/store';
import { type } from '../../utilities';
import { Injectable } from '@angular/core';
import { Dict } from '../models/dict';
import { Comment } from '../models/comment';

export const CommentActionTypes = {
  LOAD_SUCCESS: type('[Comments] Load Success'),
  ADD_SUCCESS: type('[Comment] Add Success'),
  UPDATE_VOTES: type('[Comment] Update'),
  LOAD: type('[Comment] Load')
}

@Injectable()
export class CommentActions {
  updateVotes(payload: Dict<Comment>) {
    return {
      type: CommentActionTypes.UPDATE_VOTES,
      payload
    }
  }
  addSuccess(payload: Dict<Comment>) {
    return {
      type: CommentActionTypes.ADD_SUCCESS,
      payload
    }
  }
  load(payload: number[]) {
    return {
      type: CommentActionTypes.LOAD,
      payload,
    }
  }
  loadSuccess(payload: Comment[]) {
    return {
      type: CommentActionTypes.LOAD_SUCCESS,
      payload
    };
  }
}
