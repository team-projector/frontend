import {deserialize, Serializer, Constructor} from 'serialize-ts';
import {format} from 'date-fns';
import {DATE_FORMAT} from '../consts';

export class EdgesToPaging<T> implements Serializer<T> {

  constructor(private type: Constructor<T>) {

  }

  serialize(source: T): string {
    throw new Error('Was not implemented');
  }

  deserialize({node}): T {
    return deserialize(node, this.type);
  }
}

export class EdgesToArray<T> implements Serializer<T[]> {

  constructor(private type: Constructor<T>) {

  }

  serialize(source: T[]): string {
    throw new Error('Was not implemented');
  }

  deserialize({edges}: { edges: { node }[] }): T[] {
    return edges.map(e => deserialize(e.node, this.type));
  }
}

export class TypedIdVariable implements Serializer<Number> {

  serialize(value: Number): Object {
    return {type: 'ID', value: value};
  }

  deserialize(data: Object): Number {
    throw new Error('Was not implemented');
  }
}

export class TypedDateVariable implements Serializer<Date> {

  serialize(value: Date): Object {
    return {type: 'Date', value: format(value, DATE_FORMAT)};
  }

  deserialize(data: Object): Date {
    throw new Error('Was not implemented');
  }
}
