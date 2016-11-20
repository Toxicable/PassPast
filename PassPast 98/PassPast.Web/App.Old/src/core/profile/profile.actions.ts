import { Action } from '@ngrx/store';
import { type } from '../../util/action-name-helper';
import { AuthTokenModel } from '../models/auth-tokens.model';
import { Alert } from '../models/alert.model';
import { ProfileModel } from '../models/profile-model';
import { Injectable } from '@angular/core';

export const ProfileActionTypes = {
    LOAD: type('[Profile] Load'),
    DELETE: type('[Profile] Delete')
}

@Injectable()
export class ProfileActions{
    Load(payload: ProfileModel): Action{
        return {
            type: ProfileActionTypes.LOAD,
            payload
        }
    }
    Delete(payload = null): Action{
        return {
            type: ProfileActionTypes.DELETE,
            payload
        }
    }
}