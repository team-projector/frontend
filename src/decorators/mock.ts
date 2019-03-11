import 'reflect-metadata';

// https://gitlab.com/junte/proposals/frontend/tree/master/src/proposals/mock

export const MOCK_OBJECT_METADATA_KEY = Symbol('mock_object');
export const MOCK_FIELD_METADATA_KEY = Symbol('mock_field');

export class MockClassDescription {
  constructor(public name: string) {
  }
}

export function MockClass() {
  return function (constructor: Function) {
    const metadata = new MockClassDescription(constructor.name);
    Reflect.defineMetadata(MOCK_OBJECT_METADATA_KEY, metadata, constructor.prototype);
  };
}

export class MockFieldNestedValue {
  constructor(public nested: string | string[]) {
  }
}

export class MockFieldDescription {
  constructor(public name: string,
              public value: string | string[] | MockFieldNestedValue) {
  }
}

export function MockField(value: string | string[]) {
  return function (target: any, property: string | symbol) {
    const metadata = Reflect.getMetadata(MOCK_FIELD_METADATA_KEY, target) || [];
    metadata.push(new MockFieldDescription(property.toString(), value));
    Reflect.defineMetadata(MOCK_FIELD_METADATA_KEY, metadata, target);
  };
}

export function MockFieldNested(value: string | string[]) {
  return function (target: any, property: string | symbol) {
    const metadata = Reflect.getMetadata(MOCK_FIELD_METADATA_KEY, target) || [];
    metadata.push(new MockFieldDescription(property.toString(), new MockFieldNestedValue(value)));
    Reflect.defineMetadata(MOCK_FIELD_METADATA_KEY, metadata, target);
  };
}
