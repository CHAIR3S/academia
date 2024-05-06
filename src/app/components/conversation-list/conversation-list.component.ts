import { Component } from '@angular/core';
import { Chat } from 'src/app/model/Chat';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss']
})
export class ConversationListComponent {
  chats: Chat[] = [
    { idChat: 1, nombre: 'Investigacion sobre los ornitorrincos', fecha: new Date(), usuario: new Usuario },
    { idChat: 2, nombre: 'Investigacion sobre los ornitorrincos', fecha: new Date(), usuario: new Usuario },
    { idChat: 3, nombre: 'Investigacion sobre los ornitorrincos', fecha: new Date(), usuario: new Usuario },
    { idChat: 4, nombre: 'Investigacion sobre los ornitorrincos', fecha: new Date(), usuario: new Usuario },
  ];

  onChatSelect(chatId: number): void {
    console.log('Chat seleccionado:', chatId);
  }
}
