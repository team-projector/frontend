import 'reflect-metadata';
import { Field, Model, Name, serialize, Serializer, Type } from 'serialize-ts/dist';

export const MODEL_METADATA_KEY = 'model_metadata';
export const MOCK_OBJECT_METADATA_KEY = 'mock_field';

export class MockClassDescription {
  constructor(public name: string) {
  }
}

export function model() {
  return function (constructor: any) {
    Model()(constructor);
    const metadata = new MockClassDescription(constructor.name);
    Reflect.defineMetadata(MODEL_METADATA_KEY, metadata, constructor.prototype);
  };
}

export interface FieldConfig {
  name?: string;
  serializer?: Serializer<any>;
  mock?: string | string[] | Function | { type: any, length: number };
}

export function field(config: FieldConfig = {}) {
  return function (obj: Object, property: string | symbol) {
    if (!!config.name) {
      Name(config.name)(obj, property);
    }
    if (!!config.serializer) {
      Type(config.serializer)(obj, property);
    }

    Field()(obj, property);

    const metadata = Reflect.getMetadata(MOCK_OBJECT_METADATA_KEY, obj) || {};
    metadata[property] = config.mock;
    Reflect.defineMetadata(MOCK_OBJECT_METADATA_KEY, metadata, obj);
  };
}
