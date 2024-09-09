import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { async, map } from 'rxjs';
import { AlertService } from '../../../../../service/alert.component';
import { ParceiroService } from '../service/parceiro.service';
import { Parceiro } from '../interface/parceiro';
import { Plano } from '../../../../../interfaces/plano';
import { PlanoService } from '../../../../../service/plano.service';
import { Grupos } from '../../../../../interfaces/grupos';
import { GrupoService } from '../../../../../service/grupo.service';

@Component({
  selector: 'app-parceiro-editar',
  templateUrl: './parceiro-editar.component.html',
  styleUrl: './parceiro-editar.component.css'
})
export class ParceiroEditarComponent {
  parceiroForm!: FormGroup;

  id: string = "";
  planos:any[] = [] ;
  grupos:Grupos[] = [] ;

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private httpParceiro: ParceiroService,
    private httpPlano: PlanoService,
    private httpGrupo: GrupoService,
    private m: AlertService
  ) {
    this.parceiroForm = this.fb.group({

      cod_interno: new FormControl(''),
      empresa_id: new FormControl(''),
      cgc: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(18)]),
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      plano: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lmt_trava: new FormControl(''),
      lmt_mes: new FormControl(''),
      grupo_id: new FormControl(''),
      ativo: new FormControl(true)
    });
  }

  ngOnInit() {
    this.router.paramMap.subscribe(async (params: any) => {
      this.id = params.get('id') ?? "";
      // this.getPlano();
      this.getGrupos();
      this.garregaInformacoes();
    });
  }

  // getPlano() {
  //   this.httpPlano.getAll().subscribe((response: any) => {
  //       this.planos = Object.keys(response).map((key:any) => ({ nome: key, valor: response[key] }));
  //   });
  // }

  getGrupos() {
    this.httpGrupo.getAll().subscribe((response: any) => {
      this.grupos = response;
    },(error:any)=>{
      this.grupos = [];
    });
  }

  garregaInformacoes() {
    this.httpParceiro.getId(this.id).subscribe((response: Parceiro) => {
      this.parceiroForm.patchValue({
        cod_interno: response.cod_interno,
        empresa_id: response.empresa_id,
        cgc: response.cgc,
        nome: response.nome,
        plano: response.plano,
        lmt_trava: response.lmt_trava,
        lmt_mes: response.lmt_mes,
        grupo_id: response.grupo_id,
        ativo: response.ativo
      });
    }, (error: any) => this.route.navigate(['dashboard/parceiro']));
  }


  onSubmit() {
    console.log(this.parceiroForm.value);
    if (this.parceiroForm.valid) {

      const formValue = { ...this.parceiroForm.value };

      formValue.valsaldo = formValue.valsaldo === 'true' || formValue.valsaldo == true;
      formValue.ativo = formValue.ativo === 'true' || formValue.ativo == true;

      this.httpParceiro.update(this.id, formValue).subscribe((response: any) => {
        this.m.alertsucess(response.message);
        this.route.navigate(['dashboard/parceiro']);
      }, (error: any) => {
        this.m.alerterror(error.statusText)
      });
    }
  }

}
