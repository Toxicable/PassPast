import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthGuard } from "./auth-guard.service";
import { Observable } from 'rxjs';

@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(private authGuard: AuthGuard ) { }

    private role: string = "SuperAdmin";

    canActivate(): Observable<boolean> {
        return this.authGuard.isInRole(this.role);
    }
}