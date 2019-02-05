import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {Duration, Moment} from 'moment';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(seconds: number): string {
    const duration = moment.duration(seconds, 'second');

    const units = [
      {value: duration.years(), unit: 'y'},
      {value: duration.months(), unit: 'm'},
      {value: duration.days(), unit: 'd'},
      {value: duration.hours(), unit: 'h'},
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
