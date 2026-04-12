import { AuthUser } from './auth-user';

export interface LoginResponse {
  token: string;
  user: AuthUser;
}
