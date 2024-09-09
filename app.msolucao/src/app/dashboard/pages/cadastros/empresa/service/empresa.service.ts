import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { Empresa } from '../interface/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(environment.BASEURL+"/empresas");
  }
  
  getId(id: string): Observable<Empresa> {
    return this.http.get<Empresa>(environment.BASEURL+"/empresas/"+id);
  }


  post(body: any): Observable<any[]> {
    return this.http.post<any[]>( environment.BASEURL+"/empresas" , body );
  }

  update(id: string , body: any): Observable<any[]> {
    return this.http.put<any[]>( environment.BASEURL+"/empresas/"+id , body );
  }

  imagem(formData: any): Observable<any[]> {
    return this.http.post<any[]>( environment.BASEURL+"/upload_logo" , formData );
  }

}
