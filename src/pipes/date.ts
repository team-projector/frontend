import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(seconds: number): string {
    const hours = moment.duration(seconds, 'second').asHours();
    return Math.round(hours).toString();
  }
}

@Pipe({name: 'copyDate'})
export class CopyDatePipe implements PipeTransform {
  transform(date: Moment): Moment {
    return moment(date);
  }
}
