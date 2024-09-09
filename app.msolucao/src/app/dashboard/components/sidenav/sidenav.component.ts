import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent { 

  isOpen = false;
  fieldOne: string = '';
  fieldTwo: string = '';
  travaForm!: FormGroup;
  dadosIntegracao: any;
  logoMarca:string = '';

  private listener!: () => void;

  constructor(private renderer: Renderer2, private el: ElementRef,private fb: FormBuilder,) {
    this.listener = this.renderer.listen('document', 'click', (event) => {
      if (!this.el.nativeElement.contains(event.target) && this.isOpen) {
        this.toggleSidenav(null, null);
      }
    });
    this.travaForm = this.fb.group({
      // empresa_id: new FormControl(''),
      produto_id: new FormControl('OURO'),
      parceiro_id: new FormControl(''),
      usuario_id: new FormControl(''),
      quantidade: new FormControl(''),
      preco_unitario: new FormControl(''),
      preco_total: new FormControl(''),
      cotacao: new FormControl(''),
      // desagio: new FormControl(''),
      ativo: new FormControl(true),
      status: new FormControl('A'),
      // Campos de integração
      codcontrole: new FormControl(''),
      sucesso: new FormControl(''),
      mensagem: new FormControl('')
    });
  }

  toggleSidenav(event: any, iten: any) {
    if(event != null){

      this.travaForm.patchValue({
        produto_id: 'OURO',
        parceiro_id: iten.parceiro_id,
        usuario_id:  iten.usuario_nome,
        quantidade:  iten.quantidade,
        preco_unitario: iten.preco_unitario,
        preco_total:    iten.preco_total,
        cotacao:        iten.preco_unitario,
        ativo: "Ativo",
        status: iten.status ? 'Integrado' : 'Pendente',
        // Campos de integração
        codcontrole: iten.integracao.codcontrole,
        sucesso: iten.integracao.sucesso ? 'Integrado' : 'Pendente',
        mensagem: iten.integracao.mensagem
      })
      event.stopPropagation();  // Isso impede que o evento de clique se propague
    }

    this.isOpen = !this.isOpen;
}


  ngOnDestroy(): void {
    this.listener();  // Remove listener when component is destroyed to prevent memory leaks
  }


  onSubmit() {
    console.log(this.travaForm.value);
    // Adicione aqui a lógica para enviar os dados para a API
  }


}