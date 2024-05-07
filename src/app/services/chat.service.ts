import { Injectable } from '@angular/core';
import { environment } from 'src/common/environments/environments.desa';
import { Usuario } from '../model/Usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = environment.basePathUrl;

  userUrl = '/chat'

  usuario: Usuario = new Usuario();

  constructor(private http: HttpClient) { }


  getAll(): Observable<any>{

    return this.http.get(this.baseUrl + this.userUrl);
  }
}
