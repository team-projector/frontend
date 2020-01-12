import 'reflect-metadata';
import { Field, Model, Name, serialize, Serializer, Type } from 'serialize-ts/dist';

export const MOCKING_METADATA_KEY = 'model_metadata';
export const MOCK_FIELDS_METADATA_KEY = 'mock_field';

export function mocking(callback: (obj: Object, context?: Object, index?: number) => void) {
  return function (constructor: any) {
    Model()(constructor);
    Reflect.defineMetadata(MOCKING_METADATA_KEY, callback, constructor.prototype);
  };
}

type MockFieldConfig = boolean | boolean[] | number | number[]
  | string | string[] | Function | { type: any, length: number };

export function mock(config: MockFieldConfig) {
  return function (obj: Object, property: string | symbol) {
    const metadata = Reflect.getMetadata(MOCK_FIELDS_METADATA_KEY, obj) || {};
    metadata[property] = config;
    Reflect.defineMetadata(MOCK_FIELDS_METADATA_KEY, metadata, obj);
  };
}

export interface ModelConfig {
  mocking?: (obj: Object, context?: Object, index?: number) => void;
}

export function model(config: ModelConfig = {}) {
  return function (constructor: any) {
    Model()(constructor);
    mocking(config.mocking)(constructor);
  };
}

export interface FieldConfig {
  name?: string;
  serializer?: Serializer<any>;
  mock?: MockFieldConfig;
}

export function field(config: FieldConfig = {}) {
  return function (obj: Object, property: string | symbol) {
    Field({
      jsonPropertyName: config.name,
      serializer: config.serializer
    })(obj, property);

    mock(config.mock)(obj, property);
  };
}
