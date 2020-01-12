import { MOCK_FIELDS_METADATA_KEY, MOCKING_METADATA_KEY } from '../decorators/model';
import * as faker from 'faker';

export const SECONDS_IN_HOUR = 3600;

export function getMock<T>(model: new () => T, context: Object = null, index: number = 0): T {
  const obj = new model() as T;
  const metadata = Reflect.getMetadata(MOCK_FIELDS_METADATA_KEY, obj);
  for (const property in metadata) {
    const type = Reflect.getMetadata('design:type', obj, property);
    if (!type) {
      continue;
    }
    const mock = metadata[property];
    if (type === Boolean || type === Number || type === String || type === Date) {
      if (!!mock) {
        if (typeof mock === 'function') {
          obj[property] = (mock as Function)(context);
        } else {
          obj[property] = mock;
        }
      }
    } else if (type === Array) {
      if (!!mock) {
        if ('type' in mock) {
          const conf = mock as { type: any, length: number };
          const list = [];
          for (let i = 0; i < conf.length; i++) {
            list.push(getMock(conf.type, context, i));
          }
          obj[property] = list;
        } else {
          if (typeof mock === 'function') {
            obj[property] = (mock as Function)();
          } else {
            obj[property] = mock;
          }
        }
      }
    } else {
      if (type === Object) {
        obj[property] = getMock(mock, context);
      } else {
        obj[property] = getMock(type, context);
      }
    }
  }
  const mocking = Reflect.getMetadata(MOCKING_METADATA_KEY, obj);
  if (!!mocking) {
    mocking(obj, context);
  }

  return obj;
}

export const mocks = {
  time: function (min: number = 0, max: number = 1) {
    return faker.random.number({min: 0, max: 8}) * SECONDS_IN_HOUR;
  }
};
