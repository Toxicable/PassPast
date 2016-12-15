import { Action } from '@ngrx/store';
import { type } from '../../../util/action-name-helper';
import { Injectable } from '@angular/core';
import { Answer } from '../models/answer';

export const AnswerActionTypes = {
  LOAD_SUCCESS: type('[Answers] Load Success'),
}

@Injectable()
export class AnswerActions {
  loadSuccess(payload: Answer[]) {
    return {
      type: AnswerActionTypes.LOAD_SUCCESS,
      payload
    };
  }
}
