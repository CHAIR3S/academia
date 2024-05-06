import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { FormsModule } from '@angular/forms';
import { ChatHeaderComponent } from 'src/app/components/chat-header/chat-header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import { ChatAreaComponent } from 'src/app/components/chat-area/chat-area.component';
import { ConversationListComponent } from 'src/app/components/conversation-list/conversation-list.component';


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
    MatIconModule
  ]
})
export class ChatModule { }
