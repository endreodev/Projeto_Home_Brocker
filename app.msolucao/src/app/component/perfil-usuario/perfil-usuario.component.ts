import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {

  nomeUsuario = localStorage.getItem('nome');

  constructor(
    private auth: AuthService
  ) { }

  sair() {
    this.auth.logout();
  }

  changePassword() {

    // Solicitar a nova senha
    Swal.fire({
      title: 'Nova Senha',
      input: 'password',
      inputLabel: 'Digite sua nova senha',
      inputPlaceholder: 'Nova senha',
      confirmButtonText: 'Atualizar',
      showCancelButton: true
    }).then((newResult) => {
      if (newResult.isConfirmed) {
        const newPassword = newResult.value;
        this.auth.updatePassword(newPassword);
      }
    });
  }

}
