import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc'; //dependencia instalada con npm que permite conectar con OpenID
import { Subject } from 'rxjs';
import { Usuario } from '../model/Usuario';


// const oAuthConfig: AuthConfig = {
//   issuer: 'https://accounts.google.com',  // The authorization provider (google)
//   strictDiscoveryDocumentValidation: false,  // Checks if all url inits with the issuer url
//   redirectUri: 'http://localhost:4200',  // the url redirect after the usser is logged, it is the url that we provided in the oauth2 config on google console
//   clientId: '579235475447-pduk5pbcjcq7pjmm1ob54mihvu75g8ie.apps.googleusercontent.com',  //Configured in google console
//   scope: 'openid profile email' // Authorizations we need to access
// }

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initImplicitFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  public get identityClaims() {

    var claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;

    return claims;
  }

  get token() {
    return this.oauthService.getAccessToken();
  }

  // Obtener detalles del usuario
  get userInfo() {
    // const claims = this.identityClaims;
    // if (claims) {
    //   return {
    //     name: claims['name'],
    //     email: claims['email'],
    //     picture: claims['picture']
    //   };
    // }
    // return null;
    return this.identityClaims;
  }

}



export const authConfig: AuthConfig = {
  // URL del servidor de OAuth 2.0
  issuer: 'https://accounts.google.com',

  // URL del documento de descubrimiento de OpenID Connect
  redirectUri: "http://localhost:4200/login",

  // El ID de cliente que se generó en Google Cloud
  clientId: '831273130160-4avvtn3ts95atdk8ovbb1i2okko01i2t.apps.googleusercontent.com',

  // El scope de los datos a los que quieres acceder
  scope: 'openid profile email',

  // Cargar tokens usando el flujo implícito de OAuth
  responseType: 'token id_token',

  // El nombre del atributo de nombre en el id_token
  strictDiscoveryDocumentValidation: false
};