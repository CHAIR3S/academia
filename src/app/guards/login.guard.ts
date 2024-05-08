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

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private _cookiesService: CookieService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    console.log(state.url);


    if (!this._cookiesService.check('token') && (state.url != '/registro' && state.url != '/login')) {
      // Si no está logueado, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }

    if (this._cookiesService.check('token') && (state.url == '/registro' || state.url == '/login')) {
      //Si esta loggeado
      this.router.navigate(['/chat']);
      return false;
    }

    
    const usuarioJSON = localStorage.getItem('usuario');
    let usuarioData: Usuario = new Usuario();

    if(usuarioJSON){
      usuarioData = JSON.parse(usuarioJSON);
      

      if (usuarioData.tipoAprendizaje == null && state.url == '/chat') {
        // A test si no lo ha hecho
        this.router.navigate(['/test']);
        return false;
      }

    }
    


    return true;
  }
}