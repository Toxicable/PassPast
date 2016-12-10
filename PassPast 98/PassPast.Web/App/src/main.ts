import './polyfills.ts';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';
import { AppSettings } from './app-settings';

if (environment.production) {
  AppSettings.SignalRUrl = "https://beta.passpast.net/api/exam-hub";
  enableProdMode();
} else {
   AppSettings.SignalRUrl = "http://localhost:5000/api/exam-hub";
}
platformBrowserDynamic().bootstrapModule(AppModule);
