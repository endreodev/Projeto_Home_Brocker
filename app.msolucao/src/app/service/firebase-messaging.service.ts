import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';
import { mergeMapTo } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseMessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private http: HttpClient
  ) { 
    this.angularFireMessaging.messages.subscribe(
      (_messaging: any) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    );
  }

  requestPermission() {
    this.angularFireMessaging.requestToken
      .subscribe(
        (token:any) => { 
          console.log(token); 
          token = token ?? "";
          // this.postToken(token);
          localStorage.setItem('firebase_token', token )
          
        },
        (error) => { console.error(error); },
      );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload:any) => {
        console.log('New message received. ', payload);
        this.currentMessage.next(payload);
        this.showNotification(payload);
      });
  }

  showNotification(message: any) {
    const notificationTitle = message.notification.title;
    const notificationOptions = {
      body: message.notification.body,
      icon: '../assets/img/logomarca.png'
    };
    new Notification(notificationTitle, notificationOptions);
  }
}
