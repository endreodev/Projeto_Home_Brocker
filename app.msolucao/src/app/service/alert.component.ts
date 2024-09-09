import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

    alertsucess(text: string) {
      Swal.fire({
        position: "top-end",
        icon: 'success',
        title: 'Alerta!',
        text: text,
        showConfirmButton: false,
        timer: 1500
      });
    }

    
    alerterror(text: string) {
        Swal.fire({
          position: "top-end",
          icon: 'error',
          title: 'Alerta!',
          text: text,
          showConfirmButton: false,
          timer: 1500
        });
    }

    alertwarning(text: string) {
        Swal.fire({
          position: "top-end",
          icon: 'warning',
          title: 'Alerta!',
          text: text,
          showConfirmButton: false,
          timer: 1500
        });
    }

}