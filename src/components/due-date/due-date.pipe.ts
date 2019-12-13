import { Pipe, PipeTransform } from '@angular/core';
import {
  addDays,
  differenceInDays,
  endOfWeek,
  format,
  isSameWeek,
  isThisWeek,
  isThisYear,
  isToday,
  isTomorrow,
  isYesterday, startOfDay
} from 'date-fns';

export const DATE_FNS_OPTIONS = {weekStartsOn: 1};

@Pipe({
  name: 'dueDate'
})

export class DueDatePipe implements PipeTransform {
  transform(dueDate: Date): string {

    const today = startOfDay(new Date());

    const endNextWeek = endOfWeek(addDays(today, 7), DATE_FNS_OPTIONS);
    const difference = differenceInDays(dueDate, today);
    const comingDay = (d) => isTomorrow(d) ? 'Tomorrow' : isToday(d) ? 'Today' :
      isYesterday(d) ? 'Yesterday' : format(d, 'D MMMM YYYY');

    let date: string = null;
    if (difference < 2) {
      date = comingDay(dueDate);
    } else if (isThisWeek(dueDate, DATE_FNS_OPTIONS)) {
      date = format(dueDate, 'dddd');
    } else if (isSameWeek(dueDate, endNextWeek, DATE_FNS_OPTIONS)) {
      date = `Next ${format(dueDate, 'dddd')}`;
    } else if (isThisYear(dueDate)) {
      date = format(dueDate, 'D MMMM');
    } else {
      date = format(dueDate, 'D MMMM YYYY');
    }

    return date;
  }
}
