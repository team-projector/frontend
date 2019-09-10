import {Pipe, PipeTransform} from '@angular/core';
import {format as fnsFormat, getDate, isSameMonth} from 'date-fns';

export enum DurationFormat {
  full = 'full',
  short = 'short'
}

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(seconds: number, format: DurationFormat = DurationFormat.full): string {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    switch (format) {
      case DurationFormat.short:
        if (Math.abs(hours) > 0) {
          return `${hours}h` + (min > 0 ? '+' : '');
        } else if (Math.abs(min) > 0) {
          return `${min}m` + (sec > 0 ? '+' : '');
        } else if (sec > 0) {
          return `${sec}s`;
        }
        break;
      default:
        const units = [
          {value: hours, unit: 'h'},
          {value: min, unit: 'm'},
          {value: sec, unit: 's'}
        ];

        return units.filter(m => !!m.value)
          .map(u => [u.value, u.unit].join('')).join(' ');
    }
  }
}

@Pipe({name: 'period'})
export class PeriodPipe implements PipeTransform {
  transform(start: Date, end: Date): string {
    const from = !!start ? (isSameMonth(start, end) ? getDate(start) : `${getDate(start)} ${fnsFormat(start, 'MMMM')}`) : '*';
    const to = !!end ? `${getDate(end)} ${fnsFormat(end, 'MMMM')}` : '*';
    return `${from} &mdash; ${to}`;
  }
}


// https://medium.com/@thunderroid/angular-date-ago-pipe-minutes-hours-days-months-years-ago-c4b5efae5fe5
@Pipe({
  name: 'fromNow',
  pure: true
})
export class FromNowPipe implements PipeTransform {

  transform(value: Date): string {
    console.log(value);
    if (!!value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) {
        return 'Just now';
      }
      const intervals = {
        'year': 31536000,
        'month': 2592000,
        'week': 604800,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
            return counter + ' ' + i + ' ago';
          } else {
            return counter + ' ' + i + 's ago';
          }
        }
      }
    }
    return value;
  }

}
