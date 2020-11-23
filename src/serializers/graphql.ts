import { deserialize, Serializer } from '@junte/serialize-ts';

type Constructor<T> = new () => T;
type Activator<T> = () => Constructor<T>;

export class EdgesToPaging<T> implements Serializer<T> {

  constructor(private type: Constructor<T> | Activator<T>) {

  }

  serialize(source: T): string {
    throw new Error('Was not implemented');
  }

  deserialize({node}): T {
    const type = !!this.type.prototype ? this.type as Constructor<T> : (this.type as Activator<T>)() as Constructor<T>;
    return deserialize(node, type);
  }
}

export class EdgesToArray<T> implements Serializer<T[]> {

  constructor(private type: Constructor<T> | Activator<T>) {

  }

  serialize(source: T[]): Object {
    throw new Error('Was not implemented');
  }

  deserialize({edges}: { edges: { node }[] }): T[] {
    const type = !!this.type.prototype ? this.type as Constructor<T> : (this.type as Activator<T>)() as Constructor<T>;
    return edges.map(e => deserialize(e.node, type));
  }
}
