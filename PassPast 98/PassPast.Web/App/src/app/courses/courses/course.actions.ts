import { Action } from '@ngrx/store';
import { Course } from '../models/course';
import { type } from '../../../util/action-name-helper';

export const CourseActionTypes = {
    LOAD: type('[Course] Load'),
    ADD: type('[Course] Add'),
    SELECT: type('[Course] Select')
}

export class CourseActions{
    Select(payload: Course): Action{
        return{
            type: CourseActionTypes.SELECT,
            payload
        }
    }

    Add(payload: Course): Action{
        return{
            type: CourseActionTypes.ADD,
            payload
        }
    }

    Load(payload: Course[]): Action{
        return{
            type: CourseActionTypes.LOAD,
            payload
        }
    }
}