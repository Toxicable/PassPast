import { Action } from '@ngrx/store';
import { type } from '../../app/util';
import { Comment } from '../models/comment';
export const ActionTypes = {
    type: type('')
}

export class nameAction implements Action{
    type = ActionTypes.type;
    constructor(public payload: Comment[]){}
}
export type Actions = nameAction;