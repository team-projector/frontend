import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';

const DAYS_IN_MONTH = 30;
const HOURS_IN_DAY = 24;

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(seconds: number): string {
    const duration = moment.duration(seconds, 'second');

    const units = [
      {value: (duration.months() * DAYS_IN_MONTH + duration.days()) * HOURS_IN_DAY + duration.hours(), unit: 'h'},
      {value: duration.minutes(), unit: 'm'},
      {value: duration.seconds(), unit: 's'},
      {value: duration.milliseconds(), unit: 'mm'}
    ];

    return units.filter(m => !!m.value)
      .map(u => [u.value, u.unit].join('')).join(' ');
  }
}

@Pipe({name: 'copyDate'})
export class CopyDatePipe implements PipeTransform {
  transform(date: Moment): Moment {
    return moment(date);
  }
}
