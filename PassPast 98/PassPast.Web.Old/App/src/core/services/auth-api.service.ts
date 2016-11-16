import { Response } from "@angular/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { HttpExceptionService } from "./http-exceptions.service";
import { LoadingBarService} from './loading-bar.service';

@Injectable()
export class AuthApiService{

    constructor(private authHttp: AuthHttp,
                private httpExceptions: HttpExceptionService,
                private loadingBar: LoadingBarService
    ){}

    baseUrl: string = '/api';

    get(path:string): Observable<any>{
        return this.loadingBar.doWithLoader(
            this.authHttp.get(this.baseUrl + path)
                .map( this.checkForError)
                .catch( error => Observable.throw(error))
                .map(this.getJson)
        )
    }

    post(path: string, body: any): Observable<any>{
        return this.loadingBar.doWithLoader(
            this.authHttp.post(this.baseUrl + path, body)
                .map( this.checkForError)
                .catch( error => this.httpExceptions.handleError(error))
                .map(this.getJson)
        )
    }

    delete(path:string): Observable<any>{
        return this.loadingBar.doWithLoader(
            this.authHttp.delete(this.baseUrl + path)
                .map( this.checkForError)
                .catch( error => Observable.throw(error))
                .map(this.getJson)
        )
    }

    private getJson(res: Response){
        //check to see if it's an empty response
        if(res.text() != ""){
            return res.json();
        }

    }

    private checkForError(res: Response){
        if(res.status >= 200 && res.status < 300){
            return res;
        }

        throw res;
    }
}