import { Action } from '@ngrx/store';
import { Exam } from '../models/exam';
import { type } from '../../util/action-name-helper';

export const ExamActionTypes = {
    LOAD: type('[Exam] Load'),
    ADD: type('[Exam] Add'),
    SELECT: type('[Exam] Select')
}

export class ExamActions{
    Select(payload: Exam): Action{
        return {
            type: ExamActionTypes.SELECT,
            payload
        }
    }

    Add(payload: Exam): Action{
        return{
            type: ExamActionTypes.ADD,
            payload
        }
    }

    Load(payload: Exam[]): Action{
        return{
            type: ExamActionTypes.LOAD,
            payload
        }
    }
}