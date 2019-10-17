import { Pipe, PipeTransform } from '@angular/core';
import { endOfDay, format as fnsFormat, getDate, isFuture, isPast, isSameMonth, isToday } from 'date-fns';

export enum DurationFormat {
  full = 'full',
  short = 'short'
}

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(seconds: number, format: DurationFormat = DurationFormat.full): string {
    const hours = Math.trunc(seconds / 3600);
    seconds %= 3600;
    const min = Math.trunc(seconds / 60);
    const sec = seconds % 60;

    if (format === DurationFormat.short) {
      if (Math.abs(hours) > 0) {
        return `${hours}h${min > 0 ? '+' : ''}`;
      } else if (Math.abs(min) > 0) {
        return `${min}m${sec > 0 ? '+' : ''}`;
      } else if (sec > 0) {
        return `${sec}s`;
      }
    }

    const units = [
      {value: hours, unit: 'h'},
      {value: min, unit: 'm'},
      {value: sec, unit: 's'}
    ];

    return units.filter(m => !!m.value)
      .map(u => [u.value, u.unit].join('')).join(' ');
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

}

@Pipe({name: 'isFuture'})
export class IsFuturePipe implements PipeTransform {
  transform(date: Date | string | number): boolean {
    return isFuture(date);
  }
}

@Pipe({name: 'isToday'})
export class IsTodayPipe implements PipeTransform {
  transform(date: Date | string | number): boolean {
    return isToday(date);
  }
}

@Pipe({name: 'format'})
export class FormatPipe implements PipeTransform {
  transform(date: Date | string | number,
            format?: string,
            options?: { locale?: Object }): string {
    return fnsFormat(date, format, options);
  }
}

@Pipe({name: 'isPast'})
export class IsPastPipe implements PipeTransform {
  transform(date: Date | string | number): boolean {
    return isPast(date);
  }
}


@Pipe({name: 'endOfDay'})
export class EndOfDayPipe implements PipeTransform {
  transform(date: Date | string | number): Date {
    return endOfDay(date);
  }
}

@Pipe({name: 'getDate'})
export class GetDatePipe implements PipeTransform {
  transform(date: Date | string | number): number {
    return getDate(date);
  }
}
