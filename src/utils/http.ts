import {HttpParams} from '@angular/common/http';
import 'reflect-metadata';
import {serialize} from 'serialize-ts';

export function encodeParams(source: any) {
  console.log(source);
  const obj: { [key: string]: string } = {};
  const serialized = serialize(source);
  for (const key in serialized) {
    if (!serialized.hasOwnProperty(key)) {
      continue;
    }
    obj[key] = serialized[key].toString();
  }

  console.log(obj);

  return new HttpParams({fromObject: obj});
}
