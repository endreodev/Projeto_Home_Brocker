import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { Parceiro } from '../interface/parceiro';

@Injectable({
  providedIn: 'root'
})
export class ParceiroService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Parceiro[]> {  
    return this.http.get<Parceiro[]>(environment.BASEURL+"/parceiro");
  }

  getParceiros(): Observable<any[]> { 
      return this.http.get<any[]>(environment.BASEURL+"/parceiro/usuario");
  }

  getId(id: string): Observable<Parceiro> {
    return this.http.get<Parceiro>(environment.BASEURL+"/parceiro/"+id);
  }


  post(body: any): Observable<any[]> {
    return this.http.post<any[]>( environment.BASEURL+"/parceiro" , body );
  }

  update(id: string , body: any): Observable<any[]> {
    return this.http.put<any[]>( environment.BASEURL+"/parceiro/"+id , body );
  }

}
