import { Injectable } from '@angular/core';
import { environment } from 'src/common/environments/environments.desa';
import { Usuario } from '../model/Usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mensaje } from '../model/Mensaje';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  baseUrl = environment.basePathUrl;

  mensajeUrl = '/mensaje'

  usuario: Usuario = new Usuario();

  mensajes: Mensaje[] = [];

  constructor(private http: HttpClient) { }


  save(mensaje: Mensaje): Observable<any>{

    return this.http.post(this.baseUrl + this.mensajeUrl, mensaje);
  }


  getAllByIdChat(idChat: number): Observable<any>{
    return this.http.get(this.baseUrl + this.mensajeUrl + '/chat/' + idChat)
  }
}
