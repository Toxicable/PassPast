import { type } from '../../app/util';
import { Action } from '@ngrx/store';
import { Course } from '../models/course';
export const ActionTypes = {
    LOAD: type('[Course] Load')
}

export class LoadAction implements Action{
    type = ActionTypes.LOAD;
    constructor(public payload: Course[]){}
}


export type Actions = LoadAction;