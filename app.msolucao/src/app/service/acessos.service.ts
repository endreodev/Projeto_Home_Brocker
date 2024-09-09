import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; 
import { Parceiro } from '../dashboard/pages/cadastros/parceiro/interface/parceiro';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  constructor(private http: HttpClient) { }

  getAll(id: any): Observable<Parceiro[]> {
    return this.http.get<Parceiro[]>(`${environment.BASEURL}/acessos-parceiro/${id}`);
  }
  
  post(body:any): Observable<any> {
    return this.http.post<any>(`${environment.BASEURL}/acessos`,body);
  }

}
