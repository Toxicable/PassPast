import { ActionReducer, Action, Store, combineReducers } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { AppState } from '../../../app/app-store';
import { Exam } from '../models/exam';
import { Observable } from 'rxjs';
import { ExamActionTypes } from './exam.actions';

export interface ExamState{
    selected: Exam,
    entities: Exam[]
}

const initalState: ExamState ={
    selected: null,
    entities: []
}

export function examReducer(state = initalState, action: Action): ExamState {
    switch (action.type) {
        case ExamActionTypes.LOAD:
            return {
                selected: state.selected,
                entities: action.payload
            };

        case ExamActionTypes.ADD:
        return {
            selected: state.selected,
            entities: [
                ...state.entities,
                action.payload
            ]
        }

        case ExamActionTypes.SELECT:
            return {
                selected: action.payload,
                entities: state.entities
            }

        default:
            return state;
    }
};