import { ActionReducer, Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Paper } from '../models/paper';
import { PaperActions, PaperActionTypes } from './paper.actions';
 
export interface PaperState{
    entities: Paper[],
    selected: Paper
}

const initalState: PaperState ={
    entities: [],
    selected: null
}

export function paperReducer(state = initalState, action: Action): PaperState {
    switch (action.type) {
        case PaperActionTypes.LOAD:
        return {
            selected: state.selected,
            entities: action.payload
        }

        case PaperActionTypes.ADD:
        return {
            selected: state.selected,
            entities: [
                ...state.entities,
                action.payload
            ]
        }

        case PaperActionTypes.SELECT:
            return {
                selected: action.payload,
                entities: state.entities
            }

        default:
            return state;
    }
};