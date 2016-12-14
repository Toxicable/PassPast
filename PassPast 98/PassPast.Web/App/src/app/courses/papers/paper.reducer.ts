import { Action } from '@ngrx/store';
import { Paper } from '../models/paper';
import { PaperActionTypes } from './paper.actions';

export interface PaperState {
  entities: Paper[];
  selectedId: number;
}

const initalState: PaperState = {
  entities: [],
  selectedId: null
};

export function paperReducer(state = initalState, action: Action): PaperState {
  switch (action.type) {
    case PaperActionTypes.LOAD_SUCCESS:
      return {
        selectedId: state.selectedId,
        entities: action.payload
      };

    case PaperActionTypes.ADD:
      return {
        selectedId: state.selectedId,
        entities: [
          ...state.entities,
          action.payload
        ]
      };

    case PaperActionTypes.SELECT_SUCCESS:
      return {
        selectedId: action.payload,
        entities: state.entities
      };

    case PaperActionTypes.DESELECT:
      return {
        selectedId: null,
        entities: state.entities
      };

    default:
      return state;
  }
}

export function getSelectedPaper(state: PaperState){
  return state.entities.find(p => p.id == state.selectedId)
}
