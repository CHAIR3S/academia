import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatHeaderComponent } from 'src/app/components/chat-header/chat-header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import { ChatAreaComponent } from 'src/app/components/chat-area/chat-area.component';
import { ConversationListComponent } from 'src/app/components/conversation-list/conversation-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ApiAcademiaInterceptor } from 'src/app/interceptor/api-academia.interceptor';


@NgModule({
  declarations: [
    ChatComponent,
    ChatHeaderComponent,
    ChatAreaComponent,
    ConversationListComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class ChatModule { }
