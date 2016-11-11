export interface ProfileModel{
    aud: string;
    exp: number;
    iss: string;
    nameid: string;
    unique_name: string;
    email_confirmed: boolean;
    role: string[];
    first_name: string;
    last_name: string;
}