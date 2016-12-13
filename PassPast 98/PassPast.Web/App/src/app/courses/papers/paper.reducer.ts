import { Action } from '@ngrx/store';
import { Paper } from '../models/paper';
import { PaperActionTypes } from './paper.actions';

export interface PaperState {
  displayed: Paper[];
  selected: Paper;
  cache: Paper[];
}

const initalState: PaperState = {
  displayed: [],
  cache: [],
  selected: null
};

export function paperReducer(state = initalState, action: Action): PaperState {
  switch (action.type) {
    case PaperActionTypes.LOAD_SUCCESS:
      return {
        cache: state.cache,
        selected: state.selected,
        displayed: action.payload
      };

    case PaperActionTypes.ADD:
      return {
        cache: state.cache,
        selected: state.selected,
        displayed: [
          ...state.displayed,
          action.payload
        ]
      };

    case PaperActionTypes.SELECT_SUCCESS:
      return {
        cache: state.cache,
        selected: action.payload,
        displayed: state.displayed
      };

    case PaperActionTypes.DESELECT:
      return {
        cache: state.cache,
        selected: null,
        displayed: state.displayed
      };

    case PaperActionTypes.CACHE:
      return {
        cache: [
          ...state.cache,
          ...action.payload
        ],
        selected: state.selected,
        displayed: state.displayed
      };

    default:
      return state;
  }
}
