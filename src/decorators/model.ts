import 'reflect-metadata';
import { MockField, MockFieldConfig, MockModel } from '@junte/mocker';
import { Field, Model, Serializer} from 'serialize-ts/dist';

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
