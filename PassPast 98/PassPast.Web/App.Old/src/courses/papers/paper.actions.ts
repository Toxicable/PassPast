import { Action } from '@ngrx/store';
import { Paper } from '../models/paper';
import { type } from '../../util/action-name-helper';
import { Injectable } from '@angular/core';

export const PaperActionTypes = {
    LOAD: type('[Papers] Load'),
    ADD: type('[Papers] Add'),
    SELECT: type('[Paper] Select')
}

@Injectable()
export class PaperActions{
    Select(payload: Paper): Action{
        return {
            type: PaperActionTypes.SELECT,
            payload
        }
    }

    Load(payload: Paper[]): Action{
        return {
            type: PaperActionTypes.LOAD,
            payload
        }
    }

    Add(payload:Paper): Action{
        return{
            type: PaperActionTypes.ADD,
            payload
        }
    }
}
