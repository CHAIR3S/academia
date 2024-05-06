import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/common/environments/environments.desa';
import { AuthUserDTO } from '../model/AuthUserDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.basePathUrl;

  authUrl = '/auth'

  constructor(private http: HttpClient) { }


  autenticar(credenciales: AuthUserDTO): Observable<any>{

    return this.http.post(this.baseUrl + this.authUrl, credenciales);
  }

}
