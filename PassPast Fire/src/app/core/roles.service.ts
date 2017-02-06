import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Role, UserRole, Dict } from '../models';

@Injectable()
export class RolesService {

  constructor(
    private af: AngularFire,
    private auth: AuthService,
  ) { }

  getRoles(): Observable<Role[]> {
    return this.af.database.object('/roles')
      .map((roles: Dict<Dict<UserRole>>) => {
        return Object.keys(roles)
          .filter(roleName => roleName !== '$exists' && roleName !== '$value' && roleName !== '$key')
          .map(roleName => {
            const role: any = roles[roleName];
            role.users = Object.keys(role).map(userKey => {
              const user: UserRole = role[userKey];
              user.$key = userKey;
              delete role[userKey];
              return user;
            });
            role.name = roleName;
            return role;
          });
      });
  }

  addToRole(form: { userKey: string; roleName: string; }) {
    this.auth.uid$.first().subscribe(uid => {
      const userRole: UserRole = {
        updatedAt: new Date().toISOString(),
        updatedBy: uid
      };
      this.af.database.object(`/roles/${form.roleName}/${form.userKey}`).set(userRole);
    });
  }

  isInRole(roleName: string) {
    return this.auth.uid$.flatMap(uid => {
      return this.af.database.object(`/roles/${roleName}/${uid}`)
        .map(result => result.$exists());
    });
  }
}
