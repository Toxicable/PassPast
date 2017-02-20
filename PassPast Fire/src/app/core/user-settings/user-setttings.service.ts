import { AuthService } from './../auth.service';
import { UserSettings } from './user-settings.model';
import { Observable } from 'rxjs/Observable';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
@Injectable()
export class UserSettingsService {

  settings$: FirebaseObjectObservable<UserSettings>;

  constructor(
    private af: AngularFire,
    private auth: AuthService,
  ) {
    this.auth.uid$.first().subscribe(uid => {
      this.settings$ = this.af.database.object(`/user-settings/${uid}`);
    });
  }

  setUserIdentifier(){
    this.settings$.update({userIdentifier: 'Fabian'});
  }


}
