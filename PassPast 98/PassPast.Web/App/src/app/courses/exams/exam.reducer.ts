import { ActionReducer, Action, Store, combineReducers } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState } from '../../../app/app-store';
import { Exam } from '../models/exam';
import { Observable } from 'rxjs';
import { ExamActionTypes } from './exam.actions';

export interface ExamState {
  selected: Exam,
  cache: Exam[],
  display: Exam[]
}

const initalState: ExamState = {
  selected: null,
  cache: [],
  display: []
}

export function examReducer(state = initalState, action: Action): ExamState {
  switch (action.type) {
    case ExamActionTypes.LOAD:
      return {
        selected: state.selected,
        display: action.payload,
        cache: state.cache
      };

    case ExamActionTypes.ADD:
      return {
        selected: state.selected,
        cache: state.cache,
        display: [
          ...state.display,
          action.payload
        ]
      };

    case ExamActionTypes.SELECT_SUCCESS:
      return {
        selected: action.payload,
        cache: state.cache,
        display: state.display
      };

    case ExamActionTypes.DESELECT:
      return {
        selected: null,
        cache: state.cache,
        display: state.display
      }

    default:
      return state;
  }
};
