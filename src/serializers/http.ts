import { Serializer } from 'serialize-ts';

export class BooleanSerializer implements Serializer<boolean> {

  serialize(value: boolean): string {
    return value ? 'True' : 'False';
  }

  deserialize(source: string): boolean {
    return source === 'True';
  }
}
