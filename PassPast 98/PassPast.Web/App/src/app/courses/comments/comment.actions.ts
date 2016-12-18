import { Action } from '@ngrx/store';
import { type } from '../../../util/action-name-helper';
import { Injectable } from '@angular/core';
import { Dict } from '../models/dict';
import { Comment } from '../models/comment';

export const CommentActionTypes = {
  LOAD_SUCCESS: type('[Comments] Load Success'),
  ADD_SUCCESS: type('[Comment] Add Success')
}

@Injectable()
export class CommentActions {
  addSuccess(payload: Dict<Comment>){
    return {
      type: CommentActionTypes.ADD_SUCCESS,
      payload
    }
  }
  loadSuccess(payload: Dict<Comment>) {
    return {
      type: CommentActionTypes.LOAD_SUCCESS,
      payload
    };
  }
}
