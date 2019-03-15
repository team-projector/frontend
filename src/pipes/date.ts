import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    const units = [
      {value: hours, unit: 'h'},
      {value: min, unit: 'm'},
      {value: sec, unit: 's'}
    ];

    return units.filter(m => !!m.value)
      .map(u => [u.value, u.unit].join('')).join(' ');
  }
}
