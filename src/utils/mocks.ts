import { MOCK_OBJECT_METADATA_KEY } from '../decorators/model';

export function getMock<T>(model: new () => T): T {
  const obj = new model() as T;
  const metadata = Reflect.getMetadata(MOCK_OBJECT_METADATA_KEY, obj);
  for (const property in metadata) {
    const type = Reflect.getMetadata('design:type', obj, property);
    if (!type) {
      continue;
    }
    const mock = metadata[property];
    if (type === Boolean || type === Number || type === String || type === Date) {
      if (!!mock) {
        if (typeof mock === 'function') {
          obj[property] = (mock as Function)();
        } else {
          obj[property] = mock;
        }
      }
    } else if (type === Array) {
      if (!!mock) {
        if ('type' in mock) {
          const conf = mock as { type: any, length: number };
          const mocks = [];
          for (let i = 0; i < conf.length; i++) {
            mocks.push(getMock(conf.type));
          }
          obj[property] = mocks;
        } else {
          if (typeof mock === 'function') {
            obj[property] = (mock as Function)();
          } else {
            obj[property] = mock;
          }
        }
      }
    } else {
      obj[property] = getMock(type);
    }
  }
  return obj;
}
