import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Usuario } from '../model/Usuario';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private _cookiesService: CookieService, private _authService: AuthenticationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log(state.url);

    if (state.url.startsWith('/login')) {
      if(this._authService.isLoggedIn() || this._cookiesService.check('token'))
        this.router.navigate(['/chat']);

      // Allow the route if it is the login route, regardless of parameters
      return true;
    }

    if (!this._cookiesService.check('token') && (state.url !== '/registro' && state.url !== '/login') && !this._authService.isLoggedIn()) {
      // If not logged in and trying to access a protected route, redirect to login
      this.router.navigate(['/login']);
      return false;
    }

    if (this._cookiesService.check('token') && (state.url === '/registro' || state.url === '/login')) {
      // If logged in and trying to access registration or login page, redirect to chat
      this.router.navigate(['/chat']);
      return false;
    }

    const usuarioJSON = localStorage.getItem('usuario');
    let usuarioData: Usuario = new Usuario();

    if (usuarioJSON) {
      usuarioData = JSON.parse(usuarioJSON);

      if (usuarioData.tipoAprendizaje == null && state.url === '/chat') {
        // If user has not completed the learning type test and trying to access chat, redirect to test
        this.router.navigate(['/test']);
        return false;
      }
    }

    return true;
  }
}
