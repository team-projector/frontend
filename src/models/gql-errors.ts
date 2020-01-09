import { Model } from 'serialize-ts/dist';
import { GqlErrorSerializer } from '../serializers/gql-error';

@Model(new GqlErrorSerializer())
export class GqlError {
  constructor(public message?: string) {

  }

  toString() {
    return this.message;
  }
}

@Model()
export class AuthorisationError extends GqlError {

  constructor(public message?: string) {
    super(message);
  }
}

@Model()
export class InputError extends GqlError {
  fields: FieldError[] = [];

  constructor(message?: string, defs: Object = {}) {
    super(message);
    // noinspection TypeScriptValidateTypes
    Object.assign(this, defs);
  }
}

@Model()
export class FieldError {
  name: string;
  messages: string[];

  constructor(defs: Object = {}) {
    // noinspection TypeScriptValidateTypes
    Object.assign(this, defs);
  }
}
