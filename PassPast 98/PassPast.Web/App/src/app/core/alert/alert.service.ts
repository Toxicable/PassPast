import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from './alert.model';
import { AlertType } from './alert-types';
import { Store}  from '@ngrx/store';
import { AppState } from '../../app-store';
import { AlertActions } from './alert.actions';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class AlertService {
    constructor(private store: Store<AppState>,
                private snackBar: MdSnackBar,
                private alertActions: AlertActions
    ) {}

    sendSuccess(message: string, delay?: number) {
        this.sendAlert({message: message, type: AlertType.success}, delay);
    }

    sendInfo(message: string, delay?: number) {
        this.sendAlert({message: message, type: AlertType.info}, delay);
    }

    sendWarning(message: string, delay?: number) {
        this.sendAlert({message: message, type: AlertType.warning}, delay);
    }

    sendError(message: string, delay?: number) {
        this.sendAlert({message: message, type: AlertType.error}, delay);
    }

    private sendAlert(alert: Alert, delay = 3000) {

        this.snackBar.open(alert.message, 'Dismiss', { duration: delay});
    }
}
