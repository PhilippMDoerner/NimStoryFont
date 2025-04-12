export type SpecialLoginState = 'token-expired'
| 'token-null'
| 'invalid-login'
| 'logged-out'
| 'no-token';

export interface Login{
  username: string;
  password: string;
}