export const appSettings: AppSettings = {
    auth:{
        external:{
            facebookAppId:"311510702571628",
            googleClientId:"137170270322-3ik6cl5m55i4ft3ff6t7l9tm2f1abkvh.apps.googleusercontent.com"

        }
    }
}

export interface AppSettings{
    auth: AuthSettings;
}

export interface AuthSettings{
    external: ExternalAuthSettings;
}

export interface ExternalAuthSettings{
    facebookAppId: string;
    googleClientId: string;
}

