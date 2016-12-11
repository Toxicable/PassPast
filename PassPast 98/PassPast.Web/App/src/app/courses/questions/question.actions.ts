import { Action } from '@ngrx/store';
import { Question } from '../models/question';
import { type } from '../../../util/action-name-helper';
import { Injectable } from '@angular/core';
import { Answer } from '../models/answer';

export const QuestionActionTypes = {
  LOAD: type('[Questions] Load'),
  LOAD_SUCCESS: type('[Questions] Load Success'),
  CACHE: type('[Questions] Cache'),
  ADD_ANSWER: type('[Question] Answer Add')
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
  cache(payload: Question[]) {
    return {
      type: QuestionActionTypes.CACHE,
      payload
    }
  }
  addAnswer(payload: Answer){
    return {
      type: QuestionActionTypes.ADD_ANSWER,
      payload
    }
  }


}
