import { AuthTokenModel } from './auth-tokens.model';
import { ProfileModel } from './profile-model';

export interface AuthState {
  tokens: AuthTokenModel;
  profile: ProfileModel;
  loggedIn: boolean;
  authReady: boolean;
}
