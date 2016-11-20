import { Injectable } from '@angular/core';
import {Router, CanLoad, Route} from '@angular/router';
import { CanActivate } from '@angular/router';
import {AuthGuard} from "./auth-guard.service";
import {Observable} from 'rxjs';

@Injectable()
export class SuperAdminAuthGuard  implements CanActivate, CanLoad {

    constructor(private authGuard: AuthGuard ) { }

    private role: string = "SuperAdmin";

    canActivate(): Observable<boolean> {
        return this.authGuard.isInRole(this.role);
    }
    canLoad(route: Route): Observable<boolean> {
        return this.canActivate();
    }
}