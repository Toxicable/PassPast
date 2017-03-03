import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class AnaliticsErrorHandler implements ErrorHandler {

  constructor(
    private analitics: Angulartics2GoogleAnalytics
  ) { }

    handleError(error: any): void {
      this.analitics.exceptionTrack(error);
    }
}
