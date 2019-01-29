import {Pipe, PipeTransform} from '@angular/core';
import {Moment} from 'moment';

@Pipe({name: 'startOfMonth'})
export class StartOfMonth implements PipeTransform {
  transform(date: Moment): Moment {
    return date.startOf('month');
  }
}
