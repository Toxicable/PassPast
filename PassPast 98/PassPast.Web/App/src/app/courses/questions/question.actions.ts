import { Action } from '@ngrx/store';
import { Question } from '../models/question';
import { type } from '../../../util/action-name-helper';
import { Injectable } from '@angular/core';

export const QuestionActionTypes = {
  LOAD: type('[Questions] Load'),
  LOAD_SUCCESS: type('[Questions] Load Success'),
}

@Injectable()
export class QuestionActions {
  load(payload: number): Action {
    return {
      type: QuestionActionTypes.LOAD,
      payload
    };
  }
  loadSuccess(payload: Question[]) {
    return {
      type: QuestionActionTypes.LOAD_SUCCESS,
      payload
    };
  }
}
