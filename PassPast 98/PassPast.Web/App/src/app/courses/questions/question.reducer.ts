import { Action } from '@ngrx/store';
import { Question } from '../models/question';
import { QuestionActionTypes } from './question.actions';
 
export interface QuestionState{
    entities: Question[];
    //selected: Question[];
}

const initalState: QuestionState ={
    entities: []
    //selected: []
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
}
