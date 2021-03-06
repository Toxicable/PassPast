import { Injectable } from '@angular/core';
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { AppState } from '../app-store';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { OpenIdClientService, AuthTokens} from '@toxicable/oidc';

@Injectable()
export class AuthHttp {
  private baseUrl = environment.apiBaseUrl;
  private globalHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  constructor(
    private http: Http,
    private store: Store<AppState>,
    private oidc: OpenIdClientService
  ) { }

  private getHeaders(): Observable<Headers> {
    return this.oidc.tokens$
      .first()
      .map((tokens: AuthTokens) => tokens ? tokens.access_token : '')
      .map((accessToken: string) => new Headers(Object.assign({},
        this.globalHeaders,
        {
          Authorization: 'Bearer ' + accessToken
        }
      )));
  }

  get(url: string): Observable<any> {
    return this.getHeaders()
      .flatMap((headers: Headers) => {
        let options = new RequestOptions({ headers });
        return this.http.get(this.baseUrl + url, options)
          .map(this.checkForError)
          .catch(error => Observable.throw(error))
          .map(res => this.getJson(res));
      })
  }

  post(url: string, data: any, requestionOptions?: RequestOptions) {
    return this.getHeaders()
      .flatMap((headers: Headers) => {
        let options = requestionOptions ? requestionOptions : new RequestOptions({ headers });
        //Object.assign(new RequestOptions({ headers }), requestionOptions);

        return this.http.post(this.baseUrl + url, data, options)
          .map(this.checkForError)
          .catch(error => this.handleError(error))
          .map(this.getJson);
      })
  }

  private getJson(res: Response) {
    if (res.text() !== '') {
      return res.json();
    }

  }

  private checkForError(res: Response) {
    if (res.ok) {
      return res;
    }

    throw res;
  }

  public handleError(res: Response) {
    // TODO: add logging here

    // const error = new Error(res.statusText);
    // error['response'] = res;

    switch (res.status) {
      case 400:
        return this.handleBadRequest(res);
      case 500:
        return this.handleInternalServerError(res);
      default:
        return Observable.throw(['an Unhandled error occured' + res.status]);
    }
  }

  public handleInternalServerError(res: Response) {
    return Observable.throw([res.text()]);
  }

  private handleBadRequest(res: Response) {
    let badRequest = res.json() as BadRequest;
    let errors = badRequest.modelState[''];

    return Observable.throw(errors);
  }
}
export interface BadRequest {
    message: string;
    modelState: {'': string[]};
}
