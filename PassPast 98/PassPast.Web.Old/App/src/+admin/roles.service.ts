import {Injectable} from "@angular/core"
import {AuthApiService} from "../core/services/auth-api.service";
import { Observable }           from 'rxjs/Observable';

@Injectable()
export class RoleService{
    constructor(
                private api: AuthApiService
    ){}



    removeFromRole(userId: string, roleId: string): Observable<any>{
        return this.api.post('/api/roles/removeFromRole', {userId, roleId})
    }

}