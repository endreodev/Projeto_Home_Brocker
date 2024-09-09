import { Component } from '@angular/core';
import { Usuario } from './interface/usuario';
import { UsuarioService } from './service/usuario.service';
import { AlertService } from '../../../../service/alert.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {


  dataServices: Usuario[] = [];
  

  constructor(
    private httpService: UsuarioService,
    private m: AlertService
  ){}


  ngOnInit(): void {
    this.buscarParceiro()
  }

  buscarParceiro(){
    this.httpService.getAll().subscribe((response: Usuario[])=>{
        this.dataServices = response;
    },(error: any)=>{
        this.dataServices = [];
        this.m.alerterror(error.message);
    });
  }
}
