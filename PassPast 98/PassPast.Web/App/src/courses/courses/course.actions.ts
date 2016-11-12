import { type } from '../../app/util';
import { Action } from '@ngrx/store';
import { Course } from '../models/course';

export const ActionTypes = {
    LOAD: type('[Course] Load'),
    ADD_COURSE: type('[Course] Add'),
    SELECT: type('[Course] Select')
}

export class SelectAction implements Action{
    type = ActionTypes.SELECT;
    constructor(public payload: Course){}
}

export class AddAction implements Action{
    type = ActionTypes.ADD_COURSE;
    constructor(public payload: Course){}
}

export class LoadAction implements Action{
    type = ActionTypes.LOAD;
    constructor(public payload: Course[]){}
}


export type Actions = LoadAction | AddAction | SelectAction;