import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatBR'
})


export class NumberFormatBRPipe implements PipeTransform {
  transform(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }
}
