import { Pipe, PipeTransform } from '@angular/core';
import { format as fnsFormat, getDate, isFuture, isPast, isSameMonth, isToday } from 'date-fns';
import { DFNS_OPTIONS } from 'src/consts';
import { DurationFormat } from 'src/models/enums/duration-format';

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
    const from = !!start ? (isSameMonth(start, end) ? getDate(start)
      : `${getDate(start)} ${fnsFormat(start, 'MMMM', DFNS_OPTIONS)}`) : '*';
    const to = !!end ? `${getDate(end)} ${fnsFormat(end, 'MMMM', DFNS_OPTIONS)}` : '*';
    return `${from} &mdash; ${to}`;
  }
}

// https://medium.com/@thunderroid/angular-date-ago-pipe-minutes-hours-days-months-years-ago-c4b5efae5fe5

@Pipe({name: 'isFuture'})
export class IsFuturePipe implements PipeTransform {
  transform(date: Date | number): boolean {
    return isFuture(date);
  }
}

@Pipe({name: 'isToday'})
export class IsTodayPipe implements PipeTransform {
  transform(date: Date | number): boolean {
    return isToday(date);
  }
}

@Pipe({name: 'isPast'})
export class IsPastPipe implements PipeTransform {
  transform(date: Date | number): boolean {
    return isPast(date);
  }
}

