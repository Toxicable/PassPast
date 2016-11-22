import { ActionReducer, Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Paper } from '../models/paper';
import { Question } from '../models/question';
import { QuestionActionTypes } from './question.actions';
 
export interface QuestionState{
    entities: Question[]
}

const initalState: QuestionState ={
    entities: []
}

export function questionReducer (state = initalState, action: Action): QuestionState {
    switch (action.type) {

        case QuestionActionTypes.LOAD:
            return {
                entities: action.payload
            }

        default:
            return state;
    }
};