import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberEuro'
})
export class NumberEuroPipe implements PipeTransform {

  transform(value: number, decimales: number, moneda?: string): string | number {
    let valorRedondeado: number;
    const factor: number = Math.pow(10, decimales);
    if (value < 0) {
      valorRedondeado = (Math.round(-value * factor) / factor) * -1;
    } else {
      valorRedondeado = Math.round(value * factor) / factor;
    }
    let valorFormateado = new Intl.NumberFormat('de-DE', {minimumFractionDigits: decimales}).format(valorRedondeado);
    return moneda ? valorFormateado + ' ' + moneda : valorFormateado;
  }

}
