// Angular
import '@angular/common';
import '@angular/core';
import '@angular/forms';
import '@angular/http';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/router';
// RxJS
//operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';

//observables
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';

import 'rxjs/Observable';
import 'rxjs/Subject';
import 'rxjs/Subscription';

//there is still being imported into the app bundle that I cant find so we're just gonana use the full rxjs to split
import 'rxjs/Rx'; // load the full rxjs

// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...
import  'angular2-jwt';