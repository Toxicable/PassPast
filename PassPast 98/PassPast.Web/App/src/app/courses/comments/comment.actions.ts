import { Action } from '@ngrx/store';
import { type } from '../../../util/action-name-helper';
import { Injectable } from '@angular/core';

export const CommentActionTypes = {
  LOAD_SUCCESS: type('[Comments] Load Success'),
}

@Injectable()
export class CommentActions {
  loadSuccess(payload: Comment[]) {
    return {
      type: CommentActionTypes.LOAD_SUCCESS,
      payload
    };
  }
}
