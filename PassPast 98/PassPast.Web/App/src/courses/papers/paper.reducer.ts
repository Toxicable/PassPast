import { ActionReducer, Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as paperActions from './paper.actions'
import { Paper } from '../models/paper';
 
export interface State{
    entities: Paper[],
    selected: Paper
}

const initalState: State ={
    entities: [],
    selected: null
}

export const reducer = (state = initalState, action: paperActions.Actions): State => {
    switch (action.type){
        case paperActions.ActionTypes.LOAD:
            case paperActions.ActionTypes.LOAD:
            return {
                selected: state.selected,
                entities: action.payload
            }

        case paperActions.ActionTypes.ADD:
        return {
            selected: state.selected,
            entities: [
                ...state.entities,
                action.payload
            ]
        }

        case paperActions.ActionTypes.SELECT:
            return {
                selected: action.payload,
                entities: state.entities
            }

        default:
            return state;
    }
};