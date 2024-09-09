import { Component, OnInit } from '@angular/core'; 
import { FirebaseMessagingService } from './service/firebase-messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  
  title = 'home-broker'
  message:any;

  constructor(private messagingService: FirebaseMessagingService) { }

  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.messagingService.currentMessage.subscribe( (message:any) => {
      this.message = message;
    });
  }

}
