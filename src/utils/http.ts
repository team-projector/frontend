import {HttpParams} from '@angular/common/http';
import 'reflect-metadata';
import {serialize} from 'serialize-ts';
import {isBoolean} from 'util';

export function encodeModel(source: any): any {
  const obj: { [key: string]: string } = {};
  const serialized = serialize(source);
  for (const key in serialized) {
    if (!serialized.hasOwnProperty(key)) {
      continue;
    }
    obj[key] = serialized[key].toString();
  }

  return new HttpParams({fromObject: obj});
}

export function encodeObject(source: any) {
  const obj: { [key: string]: string } = {};
  for (const key in source) {
    if (!source.hasOwnProperty(key)) {
      continue;
    }
    const val = source[key];
    if (isBoolean(val)) {
      obj[key] = val ? 'True' : 'False';
    } else {
      obj[key] = val.toString();
    }
  }

  return new HttpParams({fromObject: obj});
}
