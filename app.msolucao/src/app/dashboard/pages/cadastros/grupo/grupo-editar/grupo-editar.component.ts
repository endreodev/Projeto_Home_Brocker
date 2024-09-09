import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../../service/alert.component';
import { GrupoService } from '../../../../../service/grupo.service';
import { Grupos } from '../../../../../interfaces/grupos';

@Component({
  selector: 'app-grupo-editar',
  templateUrl: './grupo-editar.component.html',
  styleUrl: './grupo-editar.component.css'
})
export class GrupoEditarComponent {

  grupoForm!: FormGroup;
  id: string = "";

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private httpGrupos: GrupoService,
    private m: AlertService
  ) {
    this.grupoForm = this.fb.group({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      ativo: new FormControl(true)
    });
  }

  ngOnInit() {
    this.router.paramMap.subscribe(async (params:any) => {
      this.id = params.get('id') ?? "";
      this.garregaInformacoes();
    });
  }

  garregaInformacoes() {
    this.httpGrupos.getId(this.id).subscribe((response: Grupos) => {
      this.grupoForm.patchValue({
        nome: response.nome,
        ativo: response.ativo
      });
    }, (error: any) => this.route.navigate(['dashboard/grupo']));
  }


  onSubmit() {
    console.log(this.grupoForm.value);
    if (this.grupoForm.valid) {

      const formValue = { ...this.grupoForm.value };

      formValue.valsaldo = formValue.valsaldo  === 'true' || formValue.valsaldo == true;
      formValue.ativo    = formValue.ativo     === 'true' || formValue.ativo == true;
      
      this.httpGrupos.update(this.id, formValue).subscribe((response: any) => {
        this.m.alertsucess(response.message);
        this.route.navigate(['dashboard/grupo']);
      }, (error: any) => {
        this.m.alerterror(error.statusText)
      });
    }
  }

}
