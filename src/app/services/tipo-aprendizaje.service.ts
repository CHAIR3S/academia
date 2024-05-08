import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/common/environments/environments.desa';
import { TipoAprendizaje } from '../model/TipoAprendizaje';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoAprendizajeService {
  baseUrl = environment.basePathUrl;

  aprendUrl = '/tipo-aprendizaje'


  constructor(private http: HttpClient) { }


  save(aprendizaje: TipoAprendizaje): Observable<any>{

    return this.http.post(this.baseUrl + this.aprendUrl, aprendizaje);
  }
}
