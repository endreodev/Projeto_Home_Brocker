import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  private apiUrl = 'https://api.ipify.org?format=json';

  constructor(private http: HttpClient) { }

  getIPAddress(): any {
     this.http.get(this.apiUrl).subscribe((response: any) => {
        return response.ip;
    },error =>{
        return '127.0.0.1';
    });
  }
}

// console.log(`Local IP Address: ${localIP}`);

