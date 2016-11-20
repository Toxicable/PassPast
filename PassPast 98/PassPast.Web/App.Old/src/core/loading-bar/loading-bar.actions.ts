import { Action } from '@ngrx/store';
import { type } from '../../util/action-name-helper';
import { AuthTokenModel } from '../models/auth-tokens.model';
import { Alert } from '../models/alert.model';
import { Injectable } from '@angular/core';

export const LoadingBarActionTypes = {
    START: type('[LoadingBar] Start'),
    DONE: type('[LoadingBar] Done')
}

@Injectable()
export class LoadingBarActions{
    Start(): Action{
        return {
            type: LoadingBarActionTypes.START
        }
    }
    Done(): Action{
        return {
            type: LoadingBarActionTypes.DONE
        }
    }
}