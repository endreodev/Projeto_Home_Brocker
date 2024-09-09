import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GrupoService } from '../../../../service/grupo.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-lancamento-limite',
  templateUrl: './lancamento-limite.component.html',
  styleUrl: './lancamento-limite.component.css'
})
export class LancamentoLimiteComponent  implements OnInit {

  gruposForm: FormGroup;
  grupos: any[] = [];
  totalSum: number = 0;
  valorGrama: number = 0;
  totalReais: number = 0;
  currentDate: any;
  result: number = 0;

  constructor(
    private grupoService: GrupoService,
    private fb: FormBuilder
  ) {
    this.gruposForm = this.fb.group({});
  }

  ngOnInit(): void {
    
    this.grupoService.getAll().subscribe(data => {
      this.grupos = data;

      this.grupos.forEach(grupo => {
        this.gruposForm.addControl(`grupo${grupo.id}`, this.fb.control('', Validators.required));
      });

      this.gruposForm.valueChanges.subscribe(val => {
        this.totalSum = Object.values(val).reduce((acc: number, current: unknown) => {
          // Garante que tanto o acumulador quanto o valor atual sejam números
          const currentNumber = parseFloat(current as string) || 0;
          return acc + currentNumber;

        }, 0);
      });
    });

    const dataAtual = new Date();
    const dataFormatada = formatDate(dataAtual, 'yyyy-MM-dd', 'en-US');

    this.currentDate = dataFormatada;

  }

  calculaTotal(){
    this.totalReais = this.valorGrama * this.totalSum;

    this.result = this.valorGrama * this.totalSum;
  }
}