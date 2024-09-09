import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ParceiroService } from '../../dashboard/pages/cadastros/parceiro/service/parceiro.service';
import { ParceiroSharedService } from '../../dashboard/pages/cadastros/parceiro/service/parceiro.shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parceiro',
  templateUrl: './parceiro.component.html',
  styleUrl: './parceiro.component.css'
})
export class ParceiroComponent  implements OnInit {

  parceiroSelecionada: string = "";
  listParceiro: any[] = [];
  
  constructor(
    private httpParceiro: ParceiroService,
    private router: Router,
    private parceiroSharedService: ParceiroSharedService
  ) {}

  ngOnInit(): void {
    this.carregaParceiros();
  }

  carregaParceiros() {
    this.httpParceiro.getParceiros().subscribe(
      (response: any) => {
        this.listParceiro = response;
        // Supondo que você queira automaticamente selecionar o primeiro parceiro
        if (this.listParceiro.length > 0) { 
            var parcnome = localStorage.getItem('parceiro') ?? "";
            var parcid   = localStorage.getItem('idparceiro') ?? "";

            if( parcnome != "" ){
              this.selectItem(parcid, parcnome)
            }else{
              this.selectItem(this.listParceiro[0].id , this.listParceiro[0].nome);
            }
            
        }
      },
      (error: any) => {
        console.log(error.message);
      }
    );
  }
  
  selectItem(id: string, nome: string) {
    localStorage.setItem('parceiro' , nome );
    localStorage.setItem('idparceiro' , id );
    this.parceiroSelecionada = nome;
    this.parceiroSharedService.changeParceiroID(id);
    // this.router.navigate(['/dashboard/home', id]);
  }

}
