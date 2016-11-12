import { Action } from '@ngrx/store';
import { type } from '../../app/util';
import { Paper } from '../models/paper';
export const ActionTypes = {
    LOAD: type('[Papers] Load'),
    ADD: type('[Papers] Add')
}

export class LoadAction implements Action{
    type = ActionTypes.LOAD;
    constructor(public payload: Paper[]){}
}

export class AddAction implements Action{
    type = ActionTypes.ADD;
    constructor(public payload: Paper){}
}

export type Actions = LoadAction | AddAction;