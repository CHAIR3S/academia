import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Mensaje } from 'src/app/model/Mensaje';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss']
})
export class ChatAreaComponent {
  @Input() usuario: any;

  chatForm: FormGroup;
  
  mensajes: Mensaje[] = [];
  
  // = [
  //   { idMensaje: 1, texto: 'Hello, how are you? jfkdsj flkjsdkfjslkdjflk sdjfk sdjkfljs dfjsd lfsdkjfl sd', fecha: new Date(), ia: false },
  //   { idMensaje: 2, texto: 'All good! How about you?', fecha: new Date(), ia: true }
  // ];

  constructor() {
    this.chatForm = new FormGroup({
      type: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  formatDate(date: string): string {
    // Format the timestamp into a more readable form if necessary
    return new Date(date).toLocaleTimeString();
  }

  

  sendMessage(){

    if(this.chatForm.valid){
      // console.log('send message')
      const mensaje: Mensaje = new Mensaje();

      mensaje.texto = this.chatForm.value.type;
      mensaje.fecha = new Date();
      mensaje.ia = false;

      this.mensajes.push(mensaje);

      this.chatForm.reset();

    }
    
  }

  attacheImage(){
    console.log('attache image')

  }

}
