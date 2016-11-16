export const appSettings: AppSettings = {
    auth:{
        external:{
            facebookAppId:"1841204649444154",
            googleClientId:"163400937643-kh0h9ojo2bhb0n7mtao0dfqdgrklpseu.apps.googleusercontent.com"

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

