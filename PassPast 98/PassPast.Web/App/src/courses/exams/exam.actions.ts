import { type } from '../../app/util';
import { Action } from '@ngrx/store';
import { Exam } from '../models/exam';

export const ActionTypes = {
    LOAD: type('[Exam] Load'),
    ADD: type('[Exam] Add'),
    SELECT: type('[Exam] Select')
}

export class SelectAction implements Action{
    type = ActionTypes.SELECT;
    constructor(public payload: Exam){}
}

export class AddAction implements Action{
    type = ActionTypes.ADD;
    constructor(public payload: Exam){}
}

export class LoadAction implements Action{
    type = ActionTypes.LOAD;
    constructor(public payload: Exam[]){}
}


export type Actions = LoadAction | AddAction | SelectAction;