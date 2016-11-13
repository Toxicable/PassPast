import { Action } from '@ngrx/store';
import { type } from '../../app/util';
import { Paper } from '../models/paper';
import { Question } from '../models/question';
export const ActionTypes = {
    LOAD: type('[Questions] Load')
}

export class LoadAction implements Action{
    type = ActionTypes.LOAD;
    constructor(public payload: Question[]){}
}

export type Actions = LoadAction