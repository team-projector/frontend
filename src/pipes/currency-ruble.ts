import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'currency'
})

export class CurrencyLocalPipe implements PipeTransform {

  constructor(private currency: CurrencyPipe) {
  }

  transform(value: number): string {
    return this.currency.transform(value, 'RUB', 'symbol', '0.0-0');
  }
}
