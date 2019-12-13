import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'percentage'})
export class PercentagePipe implements PipeTransform {
  transform(value: number, source: number): number {
    return Math.round(value / source * 100);
  }
}

