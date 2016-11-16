import { ActionReducer, Action, Store, combineReducers } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState } from '../../app/app-store';
import { Exam } from '../models/exam';
import * as examActions from './exam.actions'
import { Observable } from 'rxjs';

export interface State{
    selected: Exam,
    entities: Exam[]
}

const initalState: State ={
    selected: null,
    entities: []
}

export const reducer = (state = initalState, action: examActions.Actions): State => {
    switch (action.type){
        case examActions.ActionTypes.LOAD:
            return {
                selected: state.selected,
                entities: action.payload
            }
            
        case examActions.ActionTypes.ADD:
        return {
            selected: state.selected,
            entities: [
                ...state.entities,
                action.payload
            ]
        }

        case examActions.ActionTypes.SELECT:
            return {
                selected: action.payload,
                entities: state.entities
            }

        default:
            return state;
    }
};

export const getCourses = (state$: Observable<State>): Observable<Exam[]> => {
    return state$.map(state => state.entities);
}