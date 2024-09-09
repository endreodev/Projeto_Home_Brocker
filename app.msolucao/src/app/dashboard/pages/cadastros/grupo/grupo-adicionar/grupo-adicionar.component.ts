import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../../service/alert.component';
import { GrupoService } from '../../../../../service/grupo.service';

@Component({
  selector: 'app-grupo-adicionar',
  templateUrl: './grupo-adicionar.component.html',
  styleUrl: './grupo-adicionar.component.css'
})
export class GrupoAdicionarComponent {

  grupoForm!: FormGroup;

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

  ngOnInit() {}

  onSubmit() {
    console.log(this.grupoForm.value);
    if (this.grupoForm.valid) {

      const formValue = { ...this.grupoForm.value };
      formValue.ativo    = formValue.ativo     === 'true' || formValue.ativo == true;
      
      this.httpGrupos.post(formValue).subscribe((response: any) => {
        this.m.alertsucess(response.message);
        this.route.navigate(['dashboard/grupo']);
      }, (error: any) => {
        this.m.alerterror(error.statusText)
      });
    }
  }

}