import { Action } from '@ngrx/store';
import { Question } from '../models/question';
import { type } from '../../../util/action-name-helper';
import { Injectable } from '@angular/core';
import { Answer } from '../models/answer';

export const QuestionActionTypes = {
  LOAD: type('[Questions] Load'),
  LOAD_SUCCESS: type('[Questions] Load Success'),
  SELECT_SUCCESS: type('[Question] Select Success'),
  ADD_ANSWER: type('[Question] Add Answer')
}

@Injectable()
export class QuestionActions {
  addAnswer(payload: Answer){
    return {
      type: QuestionActionTypes.ADD_ANSWER,
      payload
    }
  }
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
  selectSuccess(payload: number[]){
    return {
      type: QuestionActionTypes.SELECT_SUCCESS,
      payload
    }
  }
}
