import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/common/environments/environments.desa';
import { Usuario } from '../model/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  baseUrl = environment.basePathUrl;

  userUrl = '/usuario'

  usuario: Usuario = new Usuario();

  constructor(private http: HttpClient) { }


  save(usuario: Usuario): Observable<any>{

    return this.http.post(this.baseUrl + this.userUrl, usuario);
  }

  update(usuario: Usuario): Observable<any>{
    return this.http.put(this.baseUrl + this.userUrl, usuario);
  }

}
