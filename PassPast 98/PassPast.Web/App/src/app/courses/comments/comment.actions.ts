import { Action } from '@ngrx/store';
import { type } from '../../../util/action-name-helper';
import { Injectable } from '@angular/core';
import { Dict } from '../models/dict';

export const CommentActionTypes = {
  LOAD_SUCCESS: type('[Comments] Load Success'),
}

@Injectable()
export class CommentActions {
  loadSuccess(payload: Dict<Comment>) {
    return {
      type: CommentActionTypes.LOAD_SUCCESS,
      payload
    };
  }
}
