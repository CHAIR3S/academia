import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  usuarioObjeto: Usuario = new Usuario();


  messages = [
    { username: 'Madison Jones', text: 'What time was our meet', date: '20m', online: true, profileUrl: 'https://example.com/image1.png', owner: '', profileImage: 'dfdsfsdvsd', seenTime: 232, texts: 'dfdsfs' },
    // Más mensajes aquí...
  ];


  currentChat = {
    title: 'CodePen Group',
    participants: [
      { image: 'https://example.com/participant1.png' },
      // Más participantes...
    ],
    moreParticipants: 4
  };

  followMeUrl = 'https://twitter.com/YourUsername';

  searchText = '';
  userProfileUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png';

  toggleTheme() {
    // Lógica para cambiar el tema
  }

  ngOnInit(): void {

    const usuarioJSON = localStorage.getItem('usuario')
    
    
    if(usuarioJSON){
      this.usuarioObjeto = JSON.parse(usuarioJSON);
    }

    // console.log(this.usuarioObjeto)
    
  }
}
