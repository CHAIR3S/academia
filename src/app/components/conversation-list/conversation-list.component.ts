import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/model/Chat';
import { Usuario } from 'src/app/model/Usuario';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit{

  @Input() usuario: any;


  chats: Chat[] = [];
  // = [
  //   { idChat: 1, nombre: 'Investigacion sobre los ornitorrincos', fecha: new Date(), usuario: new Usuario },
  //   { idChat: 2, nombre: 'Investigacion sobre los ornitorrincos', fecha: new Date(), usuario: new Usuario },
  //   { idChat: 3, nombre: 'Investigacion sobre los ornitorrincos', fecha: new Date(), usuario: new Usuario },
  //   { idChat: 4, nombre: 'Investigacion sobre los ornitorrincos', fecha: new Date(), usuario: new Usuario },
  // ];


  constructor(
    private _chatService: ChatService
  ) {

  }

  ngOnInit(): void {

    this._chatService.getAll().subscribe(respuesta => {
      this.chats = respuesta.lista;
      // Invierte el arreglo de chats
      this.chats = this.chats.reverse();
    })

      
  }


  onChatSelect(chatId: number): void {
    console.log('Chat seleccionado:', chatId);
  }


  agregarChat(){



    // console.log('Nuevo chat')
  }

}
