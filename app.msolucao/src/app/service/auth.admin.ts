import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAdmin {
  
  private loggedInAdmin = new BehaviorSubject<boolean>(false);
  
  constructor() {}

  isAdmin($boo: boolean){
    this.loggedInAdmin.next($boo);
  }


  updateLoggedIn($boo: boolean): void {
    this.loggedInAdmin.next($boo);
  }

  usuarioAdministrador(){
    return this.loggedInAdmin.value ;
  }


}
