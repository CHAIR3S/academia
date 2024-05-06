import { Component } from '@angular/core';
import { Mensaje } from 'src/app/model/Mensaje';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent {
  mensajes: Mensaje[] = [
    { idMensaje: 1, texto: 'Hello, how are you? jfkdsj flkjsdkfjslkdjflk sdjfk sdjkfljs dfjsd lfsdkjfl sd', fecha: new Date(), ia: false },
    { idMensaje: 2, texto: 'All good! How about you?', fecha: new Date(), ia: true }
  ];
  constructor() {}

  ngOnInit(): void {
  }

  formatDate(date: string): string {
    // Format the timestamp into a more readable form if necessary
    return new Date(date).toLocaleTimeString();
  }

}
