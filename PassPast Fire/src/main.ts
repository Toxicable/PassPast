import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/interval';

declare const ga: any;

if (environment.production) {
  enableProdMode();
}

ga('create', environment.gaTrackingId, environment.gaMode );

platformBrowserDynamic().bootstrapModule(AppModule);
