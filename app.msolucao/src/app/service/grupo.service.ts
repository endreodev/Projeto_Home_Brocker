import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Plano } from '../interfaces/plano';
import { Grupos } from '../interfaces/grupos';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Grupos[]> {
    return this.http.get<Grupos[]>(`${environment.BASEURL}/grupos`);
  }

  getId(id:string): Observable<Grupos> {
    return this.http.get<Grupos>(`${environment.BASEURL}/grupos/${id}`);
  }
  
  update(id:string, body:any): Observable<Grupos[]> {
    return this.http.put<Grupos[]>(`${environment.BASEURL}/grupos/${id}`,body);
  }

  post(body:any): Observable<Grupos[]> {
    return this.http.post<Grupos[]>(`${environment.BASEURL}/grupos`,body);
  }

}
