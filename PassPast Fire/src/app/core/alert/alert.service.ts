import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Alert } from './alert.model';
import { AlertType } from './alert-types';
import { AppState } from '../../app-store';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class AlertService {
  constructor(
    private snackBar: MdSnackBar,
  ) { }

  sendSuccess(message: string, delay?: number) {
    this.sendAlert({ message: message, type: AlertType.success }, delay);
  }

  sendInfo(message: string, delay?: number) {
    this.sendAlert({ message: message, type: AlertType.info }, delay);
  }

  sendWarning(message: string, delay?: number) {
    this.sendAlert({ message: message, type: AlertType.warning }, delay);
  }

  sendError(message: string, delay?: number) {
    this.sendAlert({ message: message, type: AlertType.error }, delay);
  }

  private sendAlert(alert: Alert, delay = 3000) {

    this.snackBar.open(alert.message, 'Dismiss', { duration: delay });
  }
}
