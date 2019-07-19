import {Pipe, PipeTransform} from '@angular/core';
import {differenceInSeconds} from 'date-fns';

@Pipe({name: 'diff'})
export class DifferencePipe implements PipeTransform {
  transform(date: string): number {
    return differenceInSeconds(new Date(), date);
  }
}
