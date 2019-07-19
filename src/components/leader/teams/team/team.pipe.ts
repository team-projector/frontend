import {format, getDate, isSameMonth} from 'date-fns';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'percentage'})
export class PercentagePipe implements PipeTransform {
  transform(value: number, source: number): number {
    return Math.round(value / source * 100);
  }
}

@Pipe({name: 'period'})
export class PeriodPipe implements PipeTransform {
  transform(start: string, end: string): string {
    if (isSameMonth(start, end)) {
      return `${getDate(start)} - ${getDate(end)} ${format(start, 'MMMM')}`;
    } else {
      return `${getDate(start)} ${format(start, 'MMMM')} - ${getDate(end)} ${format(end, 'MMMM')}`;
    }
  }
}
