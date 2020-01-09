import { GraphQLError } from 'graphql';
import { Serializer } from 'serialize-ts/dist';
import { GqlError, FieldError, InputError } from '../models/gql-errors';

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
