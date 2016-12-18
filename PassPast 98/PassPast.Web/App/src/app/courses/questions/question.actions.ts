import { Action } from '@ngrx/store';
import { Question } from '../models/question';
import { type } from '../../../util/action-name-helper';
import { Injectable } from '@angular/core';
import { Answer } from '../models/answer';
import { Comment } from '../models/comment';

export const QuestionActionTypes = {
  LOAD: type('[Questions] Load'),
  LOAD_SUCCESS: type('[Questions] Load Success'),
  SELECT_SUCCESS: type('[Question] Select Success'),
  DESELECT: type('[Question] Deselect'),
  ADD_ANSWER: type('[Question] Add Answer'),
  ADD_COMMENT: type('[Question] Add Comment')
}

@Injectable()
export class QuestionActions {
  deselect(){
    return {
      type: QuestionActionTypes.DESELECT
    }
  }
  addComment(payload: Comment){
    return {
      type: QuestionActionTypes.ADD_COMMENT,
      payload
    }
  }
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
