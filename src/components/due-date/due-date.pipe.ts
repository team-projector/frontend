import { Pipe, PipeTransform } from '@angular/core';
import { differenceInDays, format, isThisWeek, isThisYear, isToday, isTomorrow, isYesterday, startOfDay } from 'date-fns';

@Pipe({
  name: 'dueDate'
})
export class DueDatePipe implements PipeTransform {
  transform(dueDate: Date): string {

    const comingDay = (d) => isTomorrow(d)
      ? $localize`:@@label.tomorrow:Tomorrow`
      : isToday(d) ? $localize`:@@label.today:Today` :
        (isYesterday(d)
          ? $localize`:@@label.yesterday:Yesterday`
          : format(d, 'd MMMM yyyy'));

    const today = startOfDay(new Date());
    const difference = differenceInDays(dueDate, today);
    if (difference < 2) {
      return comingDay(dueDate);
    } else if (isThisWeek(dueDate, {weekStartsOn: 1})) {
      return format(dueDate, 'EEEE');
    } else if (isThisYear(dueDate)) {
      return format(dueDate, 'd MMMM');
    }

    return format(dueDate, 'd MMMM yyyy');
  }
}
