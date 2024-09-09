import { Component } from '@angular/core';
import { Parceiro } from './interface/parceiro';
import { ParceiroService } from './service/parceiro.service';

@Component({
  selector: 'app-parceiro',
  templateUrl: './parceiro.component.html',
  styleUrl: './parceiro.component.css'
})
export class ParceiroCadastroComponent {

  dataParceiros: Parceiro[] = [];
  

  constructor(
    private httpParceiro: ParceiroService
  ){}


  ngOnInit(): void {
    this.buscarParceiro()
  }

  buscarParceiro(){
    this.httpParceiro.getAll().subscribe((response: Parceiro[])=>{
        this.dataParceiros = response;
    },(error: any)=>{
        this.dataParceiros = [];
    });
  }
}
