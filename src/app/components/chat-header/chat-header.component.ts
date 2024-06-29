import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from 'src/app/model/Usuario';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ChatService } from 'src/app/services/chat.service';

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
    private _router: Router,
    public _chatService: ChatService,
    private _authService: AuthenticationService
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
    this._authService.signOut();
    this._router.navigate(['login'])
  }

  openNavbar(){
    this._chatService.navbar = !this._chatService.navbar;
    console.log('navbar');
  }

}
