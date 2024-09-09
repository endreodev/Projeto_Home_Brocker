import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmpresaService } from '../service/empresa.service';
import { Empresa } from '../interface/empresa';
import { async } from 'rxjs';
import { AlertService } from '../../../../../service/alert.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresa-editar',
  templateUrl: './empresa-editar.component.html',
  styleUrl: './empresa-editar.component.css'
})
export class EmpresaEditarComponent {

  empresaForm!: FormGroup;
  logoMarca: string = '';
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private httpEmpresa: EmpresaService,
    private m: AlertService
  ) {
    this.empresaForm = this.fb.group({
      cod_interno:  new FormControl(''),
      cgc: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(18)]),
      empresa: new FormControl('', [Validators.required, Validators.minLength(3)]),
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      hrinicio: new FormControl(''),
      hrfinal: new FormControl(''),
      tokenbot: new FormControl(''),
      telegran: new FormControl(''),
      valsaldo: new FormControl(true),
      integra_skn: new FormControl(true),
      integra_gar: new FormControl(true),
      ativo: new FormControl(true)
    });
  }

  ngOnInit() {
    this.logoMarca = localStorage.getItem("logomarca") ?? "";
    this.router.paramMap.subscribe(async (params: any) => {
      this.id = params.get('id') ?? "";
      this.garregaInformacoes();
    });
  }

  garregaInformacoes() {
    this.httpEmpresa.getId(this.id).subscribe((response: Empresa) => {
      this.empresaForm.patchValue({
        cod_interno: response.cod_interno,
        cgc: response.cgc,
        empresa: response.empresa,
        nome: response.nome,
        hrinicio: response.hrinicio,
        hrfinal: response.hrfinal,
        tokenbot: response.tokenbot,
        telegran: response.telegran,
        valsaldo: response.valsaldo,
        integra_skn: response.integra_skn,
        integra_gar: response.integra_gar,
        ativo: response.ativo
      });
    }, (error: any) => this.route.navigate(['dashboard/empresa']));
  }


  onSubmit() {
    console.log(this.empresaForm.value);
    if (this.empresaForm.valid) {

      const formValue = { ...this.empresaForm.value };

      formValue.valsaldo = formValue.valsaldo === 'true' || formValue.valsaldo == true;
      formValue.ativo = formValue.ativo === 'true' || formValue.ativo == true;

      formValue.integra_skn = formValue.integra_skn === 'true' || formValue.integra_skn == true;
      formValue.integra_gar = formValue.integra_gar === 'true' || formValue.integra_gar == true;

      this.httpEmpresa.update(this.id, formValue).subscribe((response: any) => {
        this.m.alertsucess(response.message);
        this.route.navigate(['dashboard/empresa']);
      }, (error: any) => {
        this.m.alerterror(error.statusText)
      });
    }
  }


  openUploadModal() {
    Swal.fire({
      title: 'Alterar Foto de Perfil',
      html: `<input type="file" id="fileInput" class="swal2-input" accept="image/*">`,
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      preConfirm: () => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;

        // Verifica se o elemento foi encontrado e se ele contém arquivos
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
          const file = fileInput.files[0];
          return file;  // Retorna o arquivo para o próximo estágio
        } else {
          Swal.showValidationMessage('Você precisa selecionar uma imagem');
          return false;
        }
      }
    }).then(result => {
      if (result.isConfirmed) {
        const file = result.value as File;
        const formData = new FormData();
        formData.append('file', file);

        // Envia o arquivo para a API
        this.httpEmpresa.imagem(formData).subscribe((response: any) => {
          // Supondo que a API retorne a URL da imagem recém-carregada
          this.logoMarca = response['image_url'];
          localStorage.setItem("logomarca", response['image_url']);
          this.reloadPage();
          Swal.fire('Sucesso', 'Foto de perfil alterada com sucesso!', 'success');
        }, error => {
          Swal.fire('Erro', 'Não foi possível alterar a foto de perfil', 'error');
        });
      }
    });


  }

  reloadPage() {
    window.location.reload();
  }

}
