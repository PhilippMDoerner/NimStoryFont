import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/_models/login';
import {
  AuthData,
  CampaignMemberships,
  CampaignRole,
  CampaignRoles,
} from 'src/app/_models/token';
import { environment } from 'src/environments/environment';
import { log } from 'src/utils/logging';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  static USER_DATA_KEY = 'user_data';

  apiUrl = environment.apiUrl;

  private jwtTokenUrl = `${this.apiUrl}/token`;
  public refreshTokenUrl = `${this.jwtTokenUrl}/refresh`;
  private ID_IDENTIFIER_PREFIX = 'id_';

  constructor(private http: HttpClient) {}

  public login(loginData: Login) {
    return this.http.post<AuthData>(this.jwtTokenUrl, loginData);
  }

  public logout() {
    return this.http.get<void>(`${this.jwtTokenUrl}/logout`);
  }

  public refreshUserData() {
    log(this.refreshUserData.name, this.refreshTokenUrl);
    return this.http.post<void>(this.refreshTokenUrl, {});
  }

  public fetchAuthData() {
    log(this.fetchAuthData.name);

    return this.http.get<AuthData>(`${this.apiUrl}/authdata`);
  }

  public getCampaignRole(
    data: AuthData,
    campaignName: string | undefined,
  ): CampaignRole | undefined {
    if (campaignName == null) return undefined;

    const memberships = this.getCampaignMemberships(data);
    if (memberships == null) return undefined;

    const role: string = memberships[campaignName.toLowerCase()];
    const isValidRole = CampaignRoles.some((roleName) => roleName === role);
    return isValidRole ? (role as CampaignRole) : undefined;
  }

  /**Retrieves campaign memberships of a user from their token */
  public getCampaignMemberships(
    data: AuthData | undefined,
  ): CampaignMemberships | undefined {
    if (data == null) return undefined;

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
}
