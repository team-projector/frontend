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

@Pipe({name: 'includes'})
export class IncludesPipe implements PipeTransform {
  transform(el: string, arr: string[]): boolean {
    return !!arr && arr.includes(el);
  }
}
