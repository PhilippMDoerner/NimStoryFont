import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  CampaignMemberships,
  CampaignRole,
  CampaignRoles,
  TokenData,
  UserData,
} from 'src/app/_models/token';

export const dummyUserData: UserData = {
  accessToken: {
    token: 'abcdef123456',
    exp: 1678923456,
    type: 'access',
  },
  refreshToken: {
    token: 'ghijkl789012',
    exp: 1678923456,
    type: 'refresh',
  },
  userId: 123,
  userName: 'john_doe',
  isAdmin: true,
  isSuperUser: false,
  campaignMemberships: {
    campaign1: 'admin',
    campaign2: 'member',
    campaign3: 'guest',
  },
};

@Injectable({
  providedIn: 'root',
})
export class TokenMockService {
  private ID_IDENTIFIER_PREFIX = 'id_';

  public login(): Observable<UserData> {
    return of(dummyUserData);
  }

  public refreshUserData(): Observable<UserData> {
    return of(dummyUserData);
  }

  public invalidateJWTToken(): void {
    //   const jwtToken: EncodedJWTToken = {access: this.getAccessToken(), refresh: this.getRefreshToken()};
    //   return this.http.post(`${this.jwtTokenUrl}/logout`, jwtToken); //This feature is not implemented in the backend
  }

  //static for permissionDecorator.ts
  public static getUserData(): UserData {
    return dummyUserData;
  }

  public hasTokens(): boolean {
    if (TokenMockService.getUserData() == null) return false;
    return (
      !!TokenMockService.getAccessToken() &&
      !!TokenMockService.getRefreshToken()
    );
  }

  public hasValidJWTToken(): boolean {
    if (!this.hasTokens()) return false;
    return !this.isTokenExpired(TokenMockService.getRefreshToken());
  }

  //static for permissionDecorator.ts
  public static getAccessToken(): TokenData {
    return this.getUserData().accessToken;
  }

  //static for permissionDecorator.ts
  public static getRefreshToken(): TokenData {
    return this.getUserData().refreshToken;
  }

  public setUserData(data: UserData): void {
    console.log('set user data: ', data);
  }

  public removeJWTTokenFromLocalStorage(): void {
    console.log('removeJWTTokenFromLocalStorage');
  }

  public getCurrentUserPk(): number {
    return TokenMockService.getUserData().userId;
  }

  public isAdmin(): boolean {
    const data: UserData = TokenMockService.getUserData();
    return data == null ? false : data.isAdmin;
  }

  public isSuperUser(): boolean {
    const data: UserData = TokenMockService.getUserData();
    return data == null ? false : data.isSuperUser;
  }

  public getCurrentUserName(): string {
    return TokenMockService.getUserData()?.userName;
  }

  public isCampaignMember(campaignName: string): boolean {
    const role: CampaignRole | undefined = this.getCampaignRole(campaignName);
    if (role == null) {
      return false;
    }

    return (
      this.isSuperUser() ||
      this.isAdmin() ||
      role === 'member' ||
      role === 'admin'
    );
  }

  public isCampaignAdmin(campaignName: string): boolean {
    return (
      this.isSuperUser() ||
      this.isAdmin() ||
      this.getCampaignRole(campaignName) === 'admin'
    );
  }

  public isCampaignGuest(campaignName: string): boolean {
    return (
      this.isSuperUser() ||
      this.isAdmin() ||
      this.getCampaignRole(campaignName) === 'guest'
    );
  }

  public getCampaignRole(campaignName: string): CampaignRole | undefined {
    if (campaignName == null) return undefined;

    const memberships: CampaignMemberships = this.getCampaignMemberships();
    if (memberships == null) return undefined;

    const role: string = memberships[campaignName.toLowerCase()];
    const isValidRole = CampaignRoles.some((roleName) => roleName === role);
    return isValidRole ? (role as CampaignRole) : undefined;
  }

  /**Retrieves campaign memberships of a user from their token */
  public getCampaignMemberships(): CampaignMemberships {
    const data: UserData = TokenMockService.getUserData();

    const campaignMemberships: CampaignMemberships = {};
    for (const campaignIdentifier of Object.keys(data.campaignMemberships)) {
      const isIdIdentifier: boolean = campaignIdentifier.startsWith(
        this.ID_IDENTIFIER_PREFIX,
      );
      if (!isIdIdentifier) {
        campaignMemberships[campaignIdentifier.toLowerCase()] =
          data.campaignMemberships[campaignIdentifier];
      }
    }
    return campaignMemberships;
  }

  public isAccessTokenExpired(): boolean {
    return this.isTokenExpired(TokenMockService.getAccessToken());
  }

  public isRefreshTokenExpired(): boolean {
    return this.isTokenExpired(TokenMockService.getRefreshToken());
  }

  public isTokenExpired(token: TokenData): boolean {
    const expiryTimestamp = token.exp;
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);

    const isExpired = currentTimestamp >= expiryTimestamp;
    if (isExpired) {
      console.log(
        `${token.type} Token is expired. Request timestamp: ${new Date(currentTimestamp * 1000).toString()}. Token expiry timestamp: ${new Date(expiryTimestamp * 1000).toString()}`,
      );
    }
    return isExpired;
  }
}
