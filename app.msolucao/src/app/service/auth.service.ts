import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs'; 
import { environment } from '../../environments/environment';
import { AlertService } from './alert.component';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient, 
    private router: Router,
    private m: AlertService
  ) { }

  updatePassword(newPassword: string){
    this.http.post(`${environment.BASEURL}/change-password`, { new_password: newPassword })
      .subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Senha Atualizada',
            text: 'Sua senha foi atualizada com sucesso!'
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Não foi possível atualizar a senha. Por favor, tente novamente.'
          });
        }
      });
  }

  login(body: any) {

    this.http.post<any>(`${environment.BASEURL}/login`, body).subscribe((response: any) => {

      let token = '';
      let expira: any  =  Math.floor(Date.now()+((24*60*60)*1000) /1000);

      // Limpa todo o localStorage
      localStorage.clear();
      
      localStorage.setItem("access_token", response.access_token )
      localStorage.setItem("ativo", response.ativo )
      localStorage.setItem("email", response.email )
      localStorage.setItem("interno", response.interno )
      localStorage.setItem("message", response.message )
      localStorage.setItem("nome", response.nome )
      localStorage.setItem("telefone", response.telefone )
      localStorage.setItem("user_id", response.user_id )
      localStorage.setItem("empresa_id", response.empresa_id )
      localStorage.setItem("expires", response.expires )
      localStorage.setItem("logomarca", response.logomarca )
      localStorage.setItem("integracao_sankhya", response.integracao_sankhya )
      localStorage.setItem("exp" , expira.toString() )
      token = response.access_token ?? '';

      this.m.alertsucess('Acesso realizado com sucesso!');

      if (token != '') {
        this.postToken();
        this.updateLoggedIn(true);
        this.router.navigate(['/dashboard']);
      }

    }, (error: any) => {
      this.m.alerterror(error.error.message);
    });

  }

  postToken(){

      var jsonData = {
          "empresa_id": localStorage.getItem('empresa_id'),
          "usuario_id": localStorage.getItem('user_id'),
          "token": localStorage.getItem('firebase_token'),
          "interno": localStorage.getItem("interno") === "true"
      }

      this.http.post(`${environment.BASEURL}/firebase`, jsonData ).subscribe( (response:any)=>{
        console.log(response);
      })
  }

  logout(): void {
    localStorage.clear();
    this.updateLoggedIn(false);
    this.router.navigate(['/login']);
  }

  updateLoggedIn($boo: boolean): void {
    this.loggedIn.next($boo);
  }

  usuarioAutenticado() {
    this.verificaVencimento();
    return this.loggedIn.value;
  }

  verificaVencimento() {

    let expires = localStorage.getItem("expires") ?? "";
    let token  = localStorage.getItem("access_token") ?? "";

    if (expires === "") {
      console.log("A variável está vazia.");
      this.loggedIn.next(false);
      return;
    }

    if(token == ""){
      this.loggedIn.next(false);
      return;
    }

    const now = new Date();
    const expirationDate = new Date(expires);

    if (now > expirationDate) {
      this.loggedIn.next(false);
      return;
    } 
    
    this.loggedIn.next(true);

  }

}
