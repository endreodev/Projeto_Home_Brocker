import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupos } from '../../../../../interfaces/grupos';
import { AlertService } from '../../../../../service/alert.component';
import { GrupoService } from '../../../../../service/grupo.service';
import { PlanoService } from '../../../../../service/plano.service';
import { ParceiroService } from '../service/parceiro.service';

@Component({
  selector: 'app-parceiro-adicionar',
  templateUrl: './parceiro-adicionar.component.html',
  styleUrl: './parceiro-adicionar.component.css'
})
export class ParceiroAdicionarComponent {
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
      plano: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lmt_trava: new FormControl(''),
      lmt_mes: new FormControl(''),
      grupo_id: new FormControl(''),
      ativo: new FormControl(true)
    });
  }

  ngOnInit() {
    this.router.paramMap.subscribe(async (params: any) => {
      this.id = params.get('id') ?? "";
      this.getGrupos();
    });
  }


  getGrupos() {
    this.httpGrupo.getAll().subscribe((response: any) => {
      this.grupos = response;
    },(error:any)=>{
      this.grupos = [];
    });
  }

  onSubmit() {
    console.log(this.parceiroForm.value);
    if (this.parceiroForm.valid) {

      const formValue = { ...this.parceiroForm.value };

      formValue.valsaldo = formValue.valsaldo === 'true' || formValue.valsaldo == true;
      formValue.ativo = formValue.ativo === 'true' || formValue.ativo == true;

      this.httpParceiro.post(formValue).subscribe((response: any) => {
        this.m.alertsucess(response.message);
        this.route.navigate(['dashboard/parceiro']);
      }, (error: any) => {
        this.m.alerterror(error.message)
      });
    }
  }

}
