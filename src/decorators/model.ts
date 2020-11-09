import 'reflect-metadata';
import { Field, Model, Name, serialize, Serializer, Type } from 'serialize-ts/dist';
import { MockField, MOCK_FIELD_METADATA_KEY, MockFieldConfig, MockModel } from '../utils/mocks';

export interface ModelConfig {
  mocking?: (obj: Object, context?: Object, index?: number) => void;
}

export function model(config: ModelConfig = {}) {
  return function (constructor: any) {
    Model()(constructor);
    MockModel(config.mocking)(constructor);
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

    MockField(config.mock)(obj, property);
  };
}
