import { Angulartics2 } from 'angulartics2';
import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { AlertService } from './alert/alert.service'
@Injectable()
export class AnaliticsErrorHandler implements ErrorHandler {

  constructor(
    private injector: Injector
  ) { }

    handleError(error: any): void {
      console.error(error)
      const analitics = this.injector.get(Angulartics2);
      const alert = this.injector.get(AlertService);
      analitics.exceptionTrack.next(error);
      alert.sendError('An error has occured');
    }
}
