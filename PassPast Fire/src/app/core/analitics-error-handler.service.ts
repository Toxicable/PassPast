import { Angulartics2 } from 'angulartics2';
import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class AnaliticsErrorHandler implements ErrorHandler {

  constructor(
    private analitics: Angulartics2
  ) { }

    handleError(error: any): void {
      this.analitics.exceptionTrack.next(error);
    }
}
