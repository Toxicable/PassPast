import { Action } from '@ngrx/store';
import { Paper } from '../models/paper';
import { Question } from '../models/question';
import { type } from '../../util/action-name-helper';
import { Injectable } from '@angular/core';

export const QuestionActionTypes = {
    LOAD: type('[Questions] Load')
}

@Injectable()
export class QuestionActions{
    Load(payload: Question[]): Action{
        return {
            type: QuestionActionTypes.LOAD,
            payload
        }
    }
}