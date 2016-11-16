import { ActionReducer, Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as questionActions from './question.actions'
import { Paper } from '../models/paper';
import { Question } from '../models/question';
 
export interface State{
    entities: Question[]
}

const initalState: State ={
    entities: []
}

export const reducer = (state = initalState, action: questionActions.Actions): State => {
    switch (action.type){

        case questionActions.ActionTypes.LOAD:
            return {
                entities: action.payload
            }

        default:
            return state;
    }
};