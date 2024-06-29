import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http'; 
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc'; //dependencia instalada con npm que permite conectar con OpenID
import { Subject } from 'rxjs';
import { User } from '../model/User';


const oAuthConfig: AuthConfig = { 
  issuer: 'https://accounts.google.com',  // The authorization provider (google)
  strictDiscoveryDocumentValidation: false,  // Checks if all url inits with the issuer url
  redirectUri: window.location.origin + '/login',  // the url redirect after the usser is logged, it is the url that we provided in the oauth2 config on google console
  clientId: '604629377452-9fqbfs9mmkld6i1be05snhnonv18vfb0.apps.googleusercontent.com',  //Configured in google console
  dummyClientSecret: "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",
  scope: 'openid profile email', // Authorizations we need to access
  responseType: 'code',
  showDebugInformation: true,
  tokenEndpoint: 'https://oauth2.googleapis.com/token' 
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userProfileSubject = new Subject<User>();

  constructor(private readonly oAuthService: OAuthService) { 
    this.oAuthService.configure(oAuthConfig);
    this.oAuthService.loadDiscoveryDocument();
  }

  loginWithGoogle(): void {
    this.oAuthService.initLoginFlow();
  }

  handleAuthentication(): void {
    this.oAuthService.tryLoginCodeFlow().then(() => {
      if (this.oAuthService.hasValidAccessToken()) {
        this.oAuthService.loadUserProfile().then((userProfile: any) => {
          this.userProfileSubject.next(userProfile as User);
          
        });
      }
    });
  }

  getAuthHeader(): string {
    return this.oAuthService.getIdToken();
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOut() {
    this.oAuthService.logOut();
  }
}
