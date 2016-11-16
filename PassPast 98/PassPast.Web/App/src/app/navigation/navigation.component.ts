import {Component, OnInit} from '@angular/core'
import {ProfileService} from "../../core/profile/profile.service";
import {AppState} from '../app-store';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import { AccountService } from '../../core/account/account.service';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']

})
export class NavigationComponent implements OnInit{

    constructor(private profile: ProfileService,
                private account: AccountService,
                private store: Store<AppState>
    ){ }
    username: Observable<string>;
    loggedIn: Observable<boolean>

    ngOnInit(): void {
        this.username = this.store.select( state => state.auth.profile.unique_name);
        this.loggedIn = this.store.select( state => state.auth.loggedIn);
    }
}