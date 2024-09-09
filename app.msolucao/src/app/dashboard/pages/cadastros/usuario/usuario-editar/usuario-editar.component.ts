import { Component } from '@angular/core';
import { Usuario } from '../interface/usuario';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupos } from '../../../../../interfaces/grupos';
import { AlertService } from '../../../../../service/alert.component'; 
import { ParceiroService } from '../../parceiro/service/parceiro.service';
import { UsuarioService } from '../service/usuario.service';
import { Parceiro } from '../../parceiro/interface/parceiro'; 
import { AcessoService } from '../../../../../service/acessos.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrl: './usuario-editar.component.css'
})
export class UsuarioEditarComponent {

  usuarioForm!: FormGroup;

  id: string = "";
  planos:any[] = [] ;
  grupos:Grupos[] = [] ;
  dataParceiros: Parceiro[] = []; 

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private httpUsuario: UsuarioService,
    private httpParceiro: ParceiroService,
    private httpAcesso: AcessoService,
    private m: AlertService
  ) {
    this.usuarioForm = this.fb.group({
      cod_interno: new FormControl(''),
      empresa_id: new FormControl(''),
      // cgc: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      // password: new FormControl('', [Validators.required]),
      interno: new FormControl(''),
      ativo: new FormControl(true)
    });
  }

  ngOnInit() {
    this.router.paramMap.subscribe(async (params: any) => {
      this.id = params.get('id') ?? "";
      this.garregaInformacoes();
      this.buscarAcessoParceiro();
    });
  }


  garregaInformacoes() {
    this.httpUsuario.getId(this.id).subscribe((response: Usuario) => {
      this.usuarioForm.patchValue({
        cod_interno: response.cod_interno,
        empresa_id: response.empresa_id, 
        nome: response.nome,
        email: response.email,
        telefone: response.telefone,
        interno: response.interno,
        ativo: response.ativo
      });
    }, (error: any) => this.route.navigate(['dashboard/usuario']));
  }


  buscarAcessoParceiro(){
    this.httpAcesso.getAll(this.id).subscribe((response: Parceiro[])=>{
        this.dataParceiros = response;
    },(error: any)=>{
        this.dataParceiros = [];
    });
  }


  onSubmit() {
    console.log(this.usuarioForm.value);
    if (this.usuarioForm.valid) {

      const formValue = { ...this.usuarioForm.value };

      formValue.interno = formValue.interno === 'true' || formValue.interno == true;
      formValue.ativo = formValue.ativo === 'true' || formValue.ativo == true;

      this.httpUsuario.update(this.id, formValue).subscribe((response: any) => {
        this.m.alertsucess(response.message);
        this.route.navigate(['dashboard/usuario']);
      }, (error: any) => {
        this.m.alerterror(error.statusText)
      });
    }
  }


  updateAcesso(parceiroId: any, hasAccess: any): void {

    const body = {
      usuario_id: this.id,
      parceiro_id: parceiroId,
      ativo: hasAccess.checked
    };

    this.httpAcesso.post(body).pipe(
      catchError(error => {
        console.error('Erro ao atualizar acesso:', error);
        this.m.alerterror(error.message);
        return of(null);
      })
    )
    .subscribe(response => {
      if (response) {
        this.m.alertsucess(response.message);
        console.log('Acesso atualizado com sucesso:', response);
      }
    });

  }

}
