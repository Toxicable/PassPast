import {ActionReducer, Action, Store} from '@ngrx/store';
import {ProfileModel} from '../models/profile-model';
import {Injectable} from '@angular/core';
import {AppState} from '../../app/app-store';

const initialState = {
    role: []
} as ProfileModel;

@Injectable()
export class ProfileActions{
    constructor(private store: Store<AppState>){}

    storeProfile(profile: ProfileModel){
        this.store.dispatch({type: "STORE_PROFILE", payload: profile});
    }
    deleteProfile(){
        this.store.dispatch({type: "DELETE_PROFILE"});
    }
}

export const profileReducer: ActionReducer<ProfileModel> = (state = initialState, action: Action) => {
    switch (action.type){
        case "STORE_PROFILE":
            return action.payload;
        case "DELETE_PROFILE":
            return initialState;
        default:
            return state;
    }
}