import { Action } from '@ngrx/store';
import { type } from '../../../util/action-name-helper';
import { Injectable } from '@angular/core';
import { Answer } from '../models/answer';
import { Dict } from '../models/dict';

export const AnswerActionTypes = {
  ADD: type('[Answer] Add'),
  ADD_SUCCESS: type('[Answer] Add Success'),
  LOAD_SUCCESS: type('[Answers] Load Success'),
  UPDATE_VOTES: type('[Answer] Update')
};

@Injectable()
export class AnswerActions {
  updateVotes(payload: Dict<Answer>){
    return {
      type: AnswerActionTypes.UPDATE_VOTES,
      payload
    }
  }
  addSuccess(payload: Dict<Answer>) {
    return {
      type: AnswerActionTypes.ADD_SUCCESS,
      payload
    };
  }
  loadSuccess(payload: Dict<Answer>) {
    return {
      type: AnswerActionTypes.LOAD_SUCCESS,
      payload
    };
  }
}
