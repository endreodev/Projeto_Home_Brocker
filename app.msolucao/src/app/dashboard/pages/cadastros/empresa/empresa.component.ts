import { Component, OnInit } from '@angular/core';
import { Empresa } from './interface/empresa';
import { EmpresaService } from './service/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.css'
})
export class EmpresaComponent implements OnInit{

  dataEmpresas: Empresa[] = [];
  

  constructor(
    private httpEmpresa: EmpresaService
  ){}


  ngOnInit(): void {
    this.buscarEmpresas()
  }

  buscarEmpresas(){
    this.httpEmpresa.getAll().subscribe((response: Empresa[])=>{
        this.dataEmpresas = response;
    },(error: any)=>{
        this.dataEmpresas = [];

    });
  }


}
