import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(seconds: number): string {
    return moment.duration(seconds, 'second').asHours().toString();
  }
}

@Pipe({name: 'copyDate'})
export class CopyDatePipe implements PipeTransform {
  transform(date: Moment): Moment {
    return moment(date);
  }
}
