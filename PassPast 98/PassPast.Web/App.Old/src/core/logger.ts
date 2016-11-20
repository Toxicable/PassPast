import {Observable} from "rxjs";
import {AppState} from '../app/app-store';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';

export abstract class LoggingBackend {
    abstract log(payload: any): void;
}

@Injectable()
export class Logger {
    constructor(private loggingBackend: LoggingBackend){}

    log(payload: any){
        this.loggingBackend.log(payload);
    }
}

@Injectable()
export class ConsoleLoggerBackend implements LoggingBackend {
    constructor(private store: Store<AppState>){}
    log(payload: any): void{
        this.store
            .subscribe((state: AppState) =>{
                console.log("payload", payload);

                console.log("state", state);
            })
    }
}
