import {Field, Model, Name} from 'serialize-ts';
import {MockField, MockClass} from '../decorators/mock';

@Model()
@MockClass()
export class ObjectLink {

  @Field()
  @MockField('{{id}}')
  id: number;

  @Field()
  @MockField('{{presentation}}')
  presentation: string;

}
