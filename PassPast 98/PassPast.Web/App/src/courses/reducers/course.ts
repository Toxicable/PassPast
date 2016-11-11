import { ActionReducer, Action, Store, combineReducers } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState } from '../../app/app-store';
import { Course } from '../models/course';
import * as course from '../actions/course'
import { Observable } from 'rxjs';

export interface State{
    selected: Course,
    entities: Course[]
}

const initalState: State ={
    selected: null,
    entities: []
}

export const reducer = (state = initalState, action: course.Actions): State => {
    switch (action.type){
        case course.ActionTypes.LOAD:
            return {
                selected: state.selected,
                entities: action.payload
            }
            
        default:
            return state;
    }
};

export const getCourses = (state$: Observable<State>) => {
    return state$.map(state => state.entities);
}