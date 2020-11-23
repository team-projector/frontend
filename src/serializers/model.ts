import { deserialize, serialize, Serializer } from '@junte/serialize-ts';

export class LazyModel<T> implements Serializer<T> {

    constructor(private builder: () => new () => T) {

    }

    serialize(b: T): Object {
        return serialize(b);
    }

    deserialize(source: Object): T {
        return deserialize(source, this.builder());
    }
}
