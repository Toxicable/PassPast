import { Action } from '@ngrx/store';
import { type } from '../../utilities/action-name-helper';
import { Injectable } from '@angular/core';
import { Answer } from '../models/answer';
import { Dict } from '../models/dict';

export const AnswerActionTypes = {
  ADD: type('[Answer] Add'),
  ADD_SUCCESS: type('[Answer] Add Success'),
  LOAD_SUCCESS: type('[Answer] Load Success'),
  UPDATE_VOTES: type('[Answer] Update'),
  LOAD: type('[Answer] Load')
};

@Injectable()
export class AnswerActions {
  updateVotes(payload: Answer) {
    return {
      type: AnswerActionTypes.UPDATE_VOTES,
      payload
    }
  }
  addSuccess(payload: Answer) {
    return {
      type: AnswerActionTypes.ADD_SUCCESS,
      payload
    };
  }
  load(payload: number[]) {
    return {
      type: AnswerActionTypes.LOAD,
      payload
    };
  }
  loadSuccess(payload: Answer[]) {
    return {
      type: AnswerActionTypes.LOAD_SUCCESS,
      payload
    };
  }
}
