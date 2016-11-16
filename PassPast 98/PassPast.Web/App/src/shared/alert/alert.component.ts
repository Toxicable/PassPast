import { Component, OnInit, OnDestroy} from '@angular/core'
import { AlertService} from "../../core/alert/alert.service";
import { Observable} from "rxjs/Observable";
import { Alert} from "../../core/models/alert.model";
import { AppState} from '../../app/app-store';
import { Store} from '@ngrx/store';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.scss']
})
export class AlertComponent implements OnInit{
    constructor(private alertService: AlertService,
                private store: Store<AppState>
    ){}
    alerts: Observable<Alert[]>;

    ngOnInit(): void {
        this.alerts = this.store.select( state => state.alerts);
    }

}
