import { AuthService } from './auth.service';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Role, UserRole } from '../models';

@Injectable()
export class RolesService {

  constructor(
    private af: AngularFire,
    private auth: AuthService,
  ) { }

  getRoles() {
    return this.af.database.list('/roles')
      .map((roles: Role[]) => roles.map(role => {
        const users = Object.keys(role.users).map(key => {
          role.users[key].$key = key;
          return role.users[key];
        });
        role.users = users;
        return role;
      }));
  }

  addToRole(form: { userKey: string; roleKey: string; }) {
    this.auth.uid$.first().subscribe(uid => {
      const userRole: UserRole = {
        updatedAt: new Date().toISOString(),
        updatedBy: uid
      }
      this.af.database.object(`/roles/${form.roleKey}/users/${form.userKey}`).update(userRole);
    })
  }

  create(form: { name: string }) {
    this.auth.uid$.first().subscribe(uid => {
      const newRole = {
        name: form.name,
        createdAt: new Date().toISOString(),
        createdBy: uid
      }
      this.af.database.list('/roles').push(newRole);
    })
  }

  isInRole(roleName: string) {
    return this.auth.uid$.flatMap(uid => {
      return this.af.database.list(`/roles`, {
        query: {
          orderByChild: 'name',
          equalTo: roleName
        }
      }).first()
      .map((roles: Role[]) => {
          const role = roles[0];
          if (!role || !role.users[uid]) {
            return false;
          }
          return true;

        });
    });
  }
}
