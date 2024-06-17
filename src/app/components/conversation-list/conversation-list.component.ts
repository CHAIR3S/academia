import { Component, Input, OnInit } from '@angular/core';
import { Chat } from 'src/app/model/Chat';
import { Mensaje } from 'src/app/model/Mensaje';
import { Usuario } from 'src/app/model/Usuario';
import { ChatService } from 'src/app/services/chat.service';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss', './conversation-list.component.scss']
})
export class ConversationListComponent implements OnInit{

  @Input() usuario: any;


  // chats: Chat[] = [];
  // = [
  //   { idChat: 1, nombre: 'Investigacion sobre los ornitorrincos', fecha: new Date(), usuario: new Usuario },
  //   { idChat: 2, nombre: 'Investigacion sobre los ornitorrincos', fecha: new Date(), usuario: new Usuario },
  //   { idChat: 3, nombre: 'Investigacion sobre los ornitorrincos', fecha: new Date(), usuario: new Usuario },
  //   { idChat: 4, nombre: 'Investigacion sobre los ornitorrincos', fecha: new Date(), usuario: new Usuario },
  // ];


  constructor(
    public _chatService: ChatService,
    private _mensajeService: MensajeService
  ) {

  }

  ngOnInit(): void {

    this._chatService.getAllByIdUser(this.usuario.idUsuario).subscribe(respuesta => {
      console.log(respuesta.lista != null)
      if(respuesta.lista != null){
        this._chatService.chatList = respuesta.lista;
        // Invierte el arreglo de chats
        
        this._chatService.chatList = this._chatService.chatList.reverse();
      }else{
        this._chatService.chatList = [];
      }
    })

      
  }


  onChatSelect(chat: Chat): void {
    console.log('Chat seleccionado:', chat.idChat);


    // this._chatService.chatActual = chat;
    this._chatService.sendChatActual(chat);

    this._mensajeService.getAllByIdChat(chat.idChat).subscribe(respuesta => {
      // console.log(respuesta)

      this._mensajeService.mensajes = respuesta.lista;


      this._chatService.sendMessage(respuesta.lista);
      
    })

  }


  agregarChat(){

    let mensajesVacios: Mensaje[] = [];

    this._chatService.sendMessage(mensajesVacios);

    

    // console.log('Nuevo chat')
  }

}
