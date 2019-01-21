import {Field, Name} from 'serialize-ts';
import {MockField, MockClass} from '../decorators/mock';

@MockClass()
export class UserCredentials {

  @Field()
  @MockField('{{login}}')
  login: string;

  @Field()
  @MockField('{{password}}')
  password: string;

}
