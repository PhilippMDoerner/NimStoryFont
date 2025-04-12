export type CampaignRole =
  | 'member'
  | 'admin'
  | 'guest'
  | 'globalguest'
  | 'globalmember';

export const CampaignRoles: CampaignRole[] = [
  'member',
  'admin',
  'guest',
  'globalguest',
  'globalmember',
];

export interface EncodedJWTToken {
  access: string;
  refresh: string;
}

export type TokenType = 'access' | 'refresh';

export interface AuthData {
  userId: number;
  userName: string;
  isAdmin: boolean;
  isSuperUser: boolean;
  campaignMemberships: CampaignMemberships; //This is a dictionary like object, using campaign names as keys and roles (e.g. "member", "admin") as values
}

export interface UserData {
  accessToken: TokenData;
  refreshToken: TokenData;
  userId: number;
  userName: string;
  isAdmin: boolean;
  isSuperUser: boolean;
  campaignMemberships: CampaignMemberships; //This is a dictionary like object, using campaign names as keys and roles (e.g. "member", "admin") as values
}

export interface TokenData {
  token: string;
  exp: number;
  type: TokenType;
}

export interface CampaignMemberships {
  [key: string]: CampaignRole;
}
