import {Field, Model} from 'serialize-ts';
import {MockClass, MockField} from '../decorators/mock';

@Model()
@MockClass()
export class UserCredentials {

  @Field()
  @MockField('{{login}}')
  login: string;

  @Field()
  @MockField('{{password}}')
  password: string;

  constructor(defs: UserCredentials = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
