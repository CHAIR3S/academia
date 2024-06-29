import { Injectable } from '@angular/core';
import { environment } from 'src/common/environments/environments.desa';
import { Usuario } from '../model/Usuario';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Chat } from '../model/Chat';
import { Mensaje } from '../model/Mensaje';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = environment.BASE_URL_PATH;

  userUrl = '/chat'

  
  chatList: Chat[] = [];


  navbar: boolean = false;

  // chatActual: Chat = new Chat();

  private chatActualSource = new Subject<Chat>();

  chatActual$ = this.chatActualSource.asObservable();

  sendChatActual(chatActual: Chat){
    this.chatActualSource.next(chatActual);
  }


  private messageSource = new Subject<Mensaje []>();

  // Observable string streams
  messages$ = this.messageSource.asObservable();

  // Service message commands
  sendMessage(messages: Mensaje[]) {
    this.messageSource.next(messages);
  }



  constructor(private http: HttpClient) { }


  getAll(): Observable<any>{

    return this.http.get(this.baseUrl + this.userUrl);
  }


  getAllByIdUser(idUser: number): Observable<any>{

    return this.http.get(this.baseUrl + this.userUrl + '/usuario/' + idUser);
  }


  save(chat: Chat): Observable<any>{
    return this.http.post(this.baseUrl + this.userUrl, chat);
  }
}
