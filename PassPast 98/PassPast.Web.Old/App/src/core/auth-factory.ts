import {Http, RequestOptions} from "@angular/http";
import {AuthConfig, AuthHttp} from "angular2-jwt";

export function authFactory(http: Http, options: RequestOptions) {
    return new AuthHttp(new AuthConfig({
        headerName: "Authorization",
        headerPrefix: "Bearer",
        tokenName: "access_token",
        tokenGetter: (() => {
            let tokens = JSON.parse(localStorage.getItem("tokens"))
            if(tokens)
                return tokens.access_token
        }),
        globalHeaders: [{'Content-Type':'application/json', 'Accept': 'application/json'}],
        noJwtError: true,
        noTokenScheme: true
    }), http, options);
};

// Include this in your ngModule providers
export const authProvider = {
    provide: AuthHttp,
    deps: [Http, RequestOptions],
    useFactory: authFactory
};