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

@Pipe({
  name: 'dueDate'
})
export class DueDatePipe implements PipeTransform {
  transform(dueDate: Date): string {

    const today = startOfDay(new Date());

    const endNextWeek = endOfWeek(addDays(today, 7), {weekStartsOn: 1});
    const difference = differenceInDays(dueDate, today);
    const comingDay = (d) => isTomorrow(d) ? $localize`:@@label.tomorrow:Tomorrow` : isToday(d) ? $localize`:@@label.today:Today` :
      isYesterday(d) ? $localize`:@@label.yesterday:Yesterday` : format(d, 'd MMMM yyyy');

    let date: string = null;
    if (difference < 2) {
      date = comingDay(dueDate);
    } else if (isThisWeek(dueDate, {weekStartsOn: 1})) {
      date = format(dueDate, 'EEEE');
    } else if (isThisYear(dueDate)) {
      date = format(dueDate, 'd MMMM');
    } else {
      date = format(dueDate, 'd MMMM yyyy');
    }

    return date;
  }
}
