import { ActionReducer, Action, Store, combineReducers } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState } from '../../app/app-store';
import { Course } from '../models/course';
import { Observable } from 'rxjs';
import { CourseActionTypes } from './course.actions';

export interface CourseState{
    selected: Course,
    entities: Course[]
}

const initalState: CourseState ={
    selected: null,
    entities: []
}

export const courseReducer = (state = initalState, action: Action): CourseState => {
    switch (action.type){
        case CourseActionTypes.LOAD:
            return {
                selected: state.selected,
                entities: action.payload
            }
          case CourseActionTypes.ADD:
            return {
                selected: state.selected,
                entities: [
                    ...state.entities,
                    action.payload
                ]
            }
        case CourseActionTypes.SELECT:
            return {
                selected: action.payload,
                entities: state.entities
            }

        default:
            return state;
    }
};