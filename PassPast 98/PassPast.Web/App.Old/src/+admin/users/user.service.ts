import { Injectable } from "@angular/core"
import { AppState } from '../../app/app-store';
import { Store } from '@ngrx/store';
import { LoadingBarService } from '../../core/loading-bar/loading-bar.service';
import { AuthHttp } from '../../core/auth-http/auth-http.service';

@Injectable()
export class UserService{
    constructor(private authHttp: AuthHttp,
                private loadingBar: LoadingBarService,
                private store: Store<AppState>
    ){}

    path: string = '/users';

    getUsers(){
        return this.authHttp.get(this.path + '/getUsers')
            .do( users => this.store.dispatch({ type: "GET_USERS", payload: users}) )
        
    }

}