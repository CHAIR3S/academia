import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ChatHeaderComponent {
  searchQuery: any;


  onSearch(){
    
  }

}
