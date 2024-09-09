import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Plano } from '../interfaces/plano';

@Injectable({
  providedIn: 'root'
})
export class PlanoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(environment.BASEURL+"/plano");
  }


}
