import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../../app-store';
import { Store } from '@ngrx/store';
import { Storage } from '../storage';
import { ProfileModel } from './models';

@Injectable()
export class ProfileService {
  constructor(
    private storage: Storage,
    private store: Store<AppState>
  ) { }

  isEmailConfirmed(): Observable<boolean> {
    // TODO: fix this sill serilization bug
    return this.store.select(state => state.auth.profile.email_confirmed)
      .map(emailConfirmed => emailConfirmed.toString() === 'True');

  }


  isInRole(pageRole: string): Observable<boolean> {
    return this.store.select(state => state.auth.profile)
      .map((profile: ProfileModel) => {
        if (profile) {
          return profile.role.find(role => role === pageRole);
        }
        return false;
      });
  }

}
