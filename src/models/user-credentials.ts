import {Field} from 'serialize-ts';
import {MockClass, MockField} from '../decorators/mock';

@MockClass()
export class UserCredentials {

  @Field()
  @MockField('{{login}}')
  login: string;

  @Field()
  @MockField('{{password}}')
  password: string;

}
