import {Field, Name} from 'serialize-ts';
import {MockField, MockClass} from '../decorators/mock';

@MockClass()
export class UserCredentials {

  @Field()
  @Name('user_login')
  @MockField('{{lorem}}')
  login: string;

  @Field()
  @MockField('{{lorem}}')
  password: string;

}
