import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ChatHeaderComponent implements OnInit {
  searchQuery: any;
  userImageBase64: string = '';
  @Input() usuario: any;

  constructor(
    private _cookieService: CookieService,
    private _router: Router
  ){

  }

  ngOnInit(): void {

    if(this.usuario != null){
      this.userImageBase64 = this.usuario.foto;
    }

  }

  onSearch(){
    
  }

  cerrarSesion(){
    localStorage.removeItem('usuario')
    this._cookieService.delete('token')
    this._router.navigate(['login'])
  }

}
