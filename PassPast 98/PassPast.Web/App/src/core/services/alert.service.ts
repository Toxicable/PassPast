import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {Alert} from "../models/alert.model";
import {AlertType} from "../models/alert-types";
import {Store} from '@ngrx/store';
import {AppState} from '../../app/app-store';

@Injectable()
export class AlertService{
    constructor(private store: Store<AppState>){}

    sendSuccess(message: string, delay?:number) {
        this.sendAlert({message:message, type: AlertType.success} as Alert, delay)
    }

    sendInfo(message: string, delay?:number) {
        this.sendAlert({message:message, type: AlertType.info} as Alert, delay)
    }

    sendWarning(message: string, delay?:number) {
        this.sendAlert({message:message, type: AlertType.warning} as Alert, delay)
    }

    sendError(message: string, delay?:number) {
        this.sendAlert({message:message, type: AlertType.error} as Alert, delay)
    }

    private sendAlert(alert: Alert, delay:number = 3000){
        this.store.dispatch({type: "ADD_ALERT", payload: alert});
        Observable.of(true)
            .delay(delay)
            .subscribe(
                () => this.store.dispatch({type: "REMOVE_ALERT", payload: alert.message})
            );
    }
}