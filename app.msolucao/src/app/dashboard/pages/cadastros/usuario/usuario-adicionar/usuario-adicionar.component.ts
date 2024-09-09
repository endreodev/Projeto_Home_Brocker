import { Component } from '@angular/core';
import { Usuario } from '../interface/usuario';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Grupos } from '../../../../../interfaces/grupos';
import { AlertService } from '../../../../../service/alert.component';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-usuario-adicionar',
  templateUrl: './usuario-adicionar.component.html',
  styleUrl: './usuario-adicionar.component.css'
})
export class UsuarioAdicionarComponent {
  usuarioForm!: FormGroup;

  id: string = "";
  planos:any[] = [] ;
  grupos:Grupos[] = [] ;

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private httpParceiro: UsuarioService,
    private m: AlertService
  ) {
    this.usuarioForm = this.fb.group({

      cod_interno: new FormControl(''),
      empresa_id: new FormControl(''),
      // cgc: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]),
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      interno: new FormControl(''),
      ativo: new FormControl(true)
    });
  }

  ngOnInit() { }


  onSubmit() {
    console.log(this.usuarioForm.value);
    if (this.usuarioForm.valid) {

      const formValue = { ...this.usuarioForm.value };

      formValue.interno = formValue.interno === 'true' || formValue.interno == true;
      formValue.ativo = formValue.ativo === 'true' || formValue.ativo == true;
      formValue.empresa_id = localStorage.getItem('empresa_id');

      this.httpParceiro.post(formValue).subscribe((response: any) => {
        this.m.alertsucess(response.message);
        this.route.navigate(['dashboard/usuario']);
      }, (error: any) => {
        this.m.alerterror(error.statusText)
      });
    }
  }

}
