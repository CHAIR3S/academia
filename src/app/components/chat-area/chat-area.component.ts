import { RespuestaDTO } from './../../model/RespuestaDTO';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Chat } from 'src/app/model/Chat';
import { Mensaje } from 'src/app/model/Mensaje';
import { ChatService } from 'src/app/services/chat.service';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.scss', './chat-area.component copy.scss']
})
export class ChatAreaComponent {
  @Input() usuario: any;



  messageGpt: string = '';

  chatActual: Chat = new Chat();

  chatForm: FormGroup;

  mensajes: Mensaje[] = [];

  // = [
  //   { idMensaje: 1, texto: 'Hello, how are you? jfkdsj flkjsdkfjslkdjflk sdjfk sdjkfljs dfjsd lfsdkjfl sd', fecha: new Date(), ia: false },
  //   { idMensaje: 2, texto: 'All good! How about you?', fecha: new Date(), ia: true }
  // ];

  private subscription: Subscription;

  private subscriptionChat: Subscription;


  constructor(
    private _mensajeService: MensajeService,
    private _chatService: ChatService
  ) {
    this.chatForm = new FormGroup({
      type: new FormControl('', [Validators.required])
    })



    this.subscription = this._chatService.messages$.subscribe({
      next: (msg) => {

        this.mensajes = msg;


        // console.log('chat: ' +  this._chatService.chatActual)
        // console.log(msg)
      }
    });

    this.subscriptionChat = this._chatService.chatActual$.subscribe({
      next: (chat) => {
        this.chatActual = chat;

        console.log('chatActual')
        console.log(chat)

      }
    }
    )
  }

  ngOnInit(): void {
  }

  formatDate(dateStr: string): string {
    // Intenta parsear la cadena a un objeto Date
    const date = new Date(dateStr);

    if (isNaN(date.getTime())) {  // Comprueba si el objeto Date es válido
      console.error('Invalid date:', dateStr);
      return 'Invalid date';
    }

    // Extraer los componentes (mes, día, hora, minuto)
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    // Construir la cadena de fecha formateada
    const formattedDate = `${month} ${day}, ${hour}:${minute}`;

    return formattedDate;
  }



  sendMessage(): number {

    if(this.chatForm.valid){
      // console.log('send message')
      const mensaje: Mensaje = new Mensaje();

      mensaje.texto = this.chatForm.value.type;
      mensaje.fecha = new Date();
      mensaje.ia = false;

      this.chatForm.reset();

      mensaje.chat = this.chatActual;

      if(this.mensajes.length == 0){

        this.mensajes.push(mensaje);

        let chatNuevo: Chat = new Chat();

        chatNuevo.nombre = mensaje.texto;
        chatNuevo.fecha = new Date;
        chatNuevo.usuario = this.usuario;


        // let respuesta: RespuestaDTO = await (await this._chatService.save(chatNuevo)).toPromise();
        this._chatService.save(chatNuevo).subscribe(respuesta => {
          // console.log(respuesta.object)

          // console.log(respuesta)
          chatNuevo = respuesta.object;
          // console.log(respuesta.object)

          //Enviar chat a servicio para que lo agregue al array
          this._chatService.chatList.unshift(chatNuevo);
          // this._chatService.chatActual = chatNuevo
          this._chatService.sendChatActual(chatNuevo);


          mensaje.chat = respuesta.object;



          this._mensajeService.save(mensaje).subscribe(respuesta => {

            console.log(respuesta);


            this.messageGpt = mensaje.texto;
            this.sendChatMessage();

          })

        })

        return 1;


      }else{

        this.mensajes.push(mensaje);

      }




      this._mensajeService.save(mensaje).subscribe(respuesta => {

        console.log(respuesta);


        this.messageGpt = mensaje.texto;
        this.sendChatMessage();

      })


      return 1;
    }


    return 0;

  }

  attacheImage(){
    console.log('attache image')

  }



  sendChatMessage(): void {
    // this._gptService.getChatResponse(this.messageGpt)
  //   .subscribe({
  //     next: (response) => {


  //       console.log(response.choices[0].message.content)
  //       // this.mensajes.push(response.choices[0].message.content);

  //       // this.responses.push(response.choices[0].message.content);
  //       this.messageGpt = ''; // Limpiar el campo de entrada
  //     },
  //     error: (error) => {
  //       console.error('Error al enviar el mensaje:', error);
  //     }
  //   });
  }

}
