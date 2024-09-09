import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { Usuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }


  getAll(): Observable<Usuario[]> {  
    return this.http.get<Usuario[]>(environment.BASEURL+"/users");
  }

  getId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(environment.BASEURL+"/users/"+id);
  }


  post(body: any): Observable<any[]> {
    return this.http.post<any[]>( environment.BASEURL+"/users" , body );
  }

  update(id: string , body: any): Observable<any[]> {
    return this.http.put<any[]>( environment.BASEURL+"/users/"+id , body );
  }

}
