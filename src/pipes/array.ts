import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'mockArray'})
export class MockArrayPipe implements PipeTransform {
  transform(length: number): number[] {
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(i);
    }
    return arr;
  }
}

@Pipe({name: 'join'})
export class JoinPipe implements PipeTransform {
  transform(arr: string[], separator: string = ' '): string {
    return arr.join(separator);
  }
}
