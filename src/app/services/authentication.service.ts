import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http'; 
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc'; //dependencia instalada con npm que permite conectar con OpenID
import { Subject } from 'rxjs';
import { Usuario } from '../model/Usuario';


const oAuthConfig: AuthConfig = { 
  issuer: 'https://accounts.google.com',  // The authorization provider (google)
  strictDiscoveryDocumentValidation: false,  // Checks if all url inits with the issuer url
  redirectUri: 'http://localhost:4200',  // the url redirect after the usser is logged, it is the url that we provided in the oauth2 config on google console
  clientId: '579235475447-pduk5pbcjcq7pjmm1ob54mihvu75g8ie.apps.googleusercontent.com',  //Configured in google console
  scope: 'openid profile email' // Authorizations we need to access
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userProfileSubject = new Subject<Usuario>();


  constructor(

    private readonly oAuthService: OAuthService

  ) { 

  }


  autenticarGoogle(){
    this.oAuthService.configure(oAuthConfig);
    this.oAuthService.loadDiscoveryDocument().then( () => {
      this.oAuthService.tryLoginImplicitFlow().then( () => {

        if(!this.oAuthService.hasValidAccessToken()){ // If the user is not logged
          this.oAuthService.initLoginFlow();  // User put email and password
        }
        else{
          this.oAuthService.loadUserProfile().then( (userProfile) => {
            this.userProfileSubject.next(userProfile as Usuario); // Get the user profile data
          })
        }

      })

    })
  }


  getAuthHeader(): string {
      return this.oAuthService.getAccessToken()
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }


  signOut() {
    this.oAuthService.logOut();
  }

















  
  // getVideoWatchTime(videoId: string) {
  //   const auth = new google.auth.GoogleAuth({
  //     keyFile: '../../../secrets.json',
  //     scopes: ['https://www.googleapis.com/auth/youtube.readonly'],
  //   });

  //   const youtubeAnalytics = google.youtubeAnalytics({
  //     version: 'v2',
  //     auth,
  //   });

  //   const result = youtubeAnalytics.reports.query({
  //     ids: 'channel==MINE',
  //     startDate: '2023-07-01',
  //     endDate: '2023-07-11',
  //     metrics: 'views,estimatedMinutesWatched',
  //     filters: `video==${videoId}`
  //   }).then((result) => {
  //     const data = result.data;
  //     console.log(data);
  //   });

  //   return result;
  // }

}
