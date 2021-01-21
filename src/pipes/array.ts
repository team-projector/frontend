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

@Pipe({name: 'includes', pure: false})
export class IncludesPipe implements PipeTransform {
  transform(arr: any[], val: any | any[]): boolean {
    const target = arr || [];
    if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        if (target.includes(val[i])) {
          return true;
        }
      }
      return false;
    }

    return target.includes(val);
  }
}
