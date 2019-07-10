import {Serializer} from 'serialize-ts';

export class DynamicField implements Serializer<Function> {

  serialize(func: Function): Object {
    return func();
  }

  deserialize(source: string): Function {
    throw new Error('Was not implemented');
  }
}
