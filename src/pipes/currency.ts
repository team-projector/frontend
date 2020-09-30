import { CurrencyPipe as CustomCurrencyPipe } from '@angular/common';
import { Pipe } from '@angular/core';

@Pipe({name: 'currency'})
export class CurrencyPipe extends CustomCurrencyPipe {
  transform(value: number): string | null {
    return super.transform(value, null, 'symbol', '1.0-0');
  }
}
