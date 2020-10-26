import { CurrencyPipe as CustomCurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'money'})
export class MoneyPipe extends CustomCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    return super.transform(value, null, 'symbol', '1.0-0');
  }
}
