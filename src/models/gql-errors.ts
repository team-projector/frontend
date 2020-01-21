import { GraphQLError } from 'graphql';
import { Model, Serializer } from 'serialize-ts/dist';

export class GqlErrorSerializer implements Serializer<GqlError> {

  serialize(error: GqlError): string {
    throw new Error('Not implemented');
  }

  deserialize(source: GraphQLError): GqlError {
    switch (!!source.extensions ? source.extensions['code'] : null) {
      case 'INPUT_ERROR':
        const fields: FieldError[] = [];
        const fieldErrors = source.extensions['fieldErrors'] as { fieldName: string, messages: string[] }[];
        if (!!fieldErrors) {
          fieldErrors.forEach(e => {
            fields.push(new FieldError({
              name: e.fieldName,
              messages: e.messages
            }));
          });
        }

        return new InputError(source.message, {fields});
        break;
      default:
        return new GqlError(source.message);
    }
  }
}

@Model(new GqlErrorSerializer())
export class GqlError {
  constructor(public message?: string) {

  }

  toString() {
    return this.message;
  }
}

@Model()
export class NetworkError extends GqlError {

  constructor(public message?: string) {
    super(message);
  }
}

@Model()
export class AuthorisationError extends GqlError {

  constructor(public message?: string) {
    super(message);
  }
}

@Model()
export class NotFoundError extends GqlError {

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
