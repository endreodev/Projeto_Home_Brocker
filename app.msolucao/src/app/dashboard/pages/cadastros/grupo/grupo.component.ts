import { Component } from '@angular/core';
import { Grupos } from '../../../../interfaces/grupos';
import { GrupoService } from '../../../../service/grupo.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrl: './grupo.component.css'
})
export class GrupoComponent {
  dataGrupos: Grupos[] = [];
  

  constructor(
    private httpGrupo: GrupoService
  ){}


  ngOnInit(): void {
    this.buscarParceiro()
  }

  buscarParceiro(){
    this.httpGrupo.getAll().subscribe((response: Grupos[])=>{
        this.dataGrupos = response;
    },(error: any)=>{
        this.dataGrupos = [];
    });
  }
}
