import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ApiAcademiaInterceptor implements HttpInterceptor {

  constructor(
    private _cookiesService: CookieService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    // console.log('interceptor')

    if(this._cookiesService.check('token')){
      const token = this._cookiesService.get('token')
  
      const modifiedReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
      });
      // console.log(modifiedReq)

      return next.handle(modifiedReq);
    }
    
    // console.log(request)
    return next.handle(request);
  }
}
