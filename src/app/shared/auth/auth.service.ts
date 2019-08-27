import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _IDTOKEN: string;
  private _ACCESSTOKEN: string;
  private _EXPIRESAT: number;

  auth0 = new auth0.WebAuth({
    clientID: environment.auth0.clientID,
    domain: environment.auth0.domain,
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid'
  });

  constructor(public router: Router) {
    this._IDTOKEN = '';
    this._ACCESSTOKEN = '';
    this._EXPIRESAT = 0;
  }

  get accessToken(): string {
    return this._ACCESSTOKEN;
  }

  get idToken(): string {
    return this._IDTOKEN;
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.localLogin(authResult);
        this.router.navigate(['/']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private localLogin(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = (authResult.expiresIn * 1000) + Date.now();
    this._ACCESSTOKEN = authResult.accessToken;
    this._IDTOKEN = authResult.idToken;
    this._EXPIRESAT = expiresAt;
  }

  public renewTokens(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.localLogin(authResult);
      } else if (err) {
        alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time
    this._ACCESSTOKEN = '';
    this._IDTOKEN = '';
    this._EXPIRESAT = 0;

    this.auth0.logout({
      returnTo: 'http://localhost:4200/login'
    });
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    return this._ACCESSTOKEN && Date.now() < this._EXPIRESAT;
  }
}
