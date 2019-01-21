import {Field, Model} from 'serialize-ts';
import {MockClass, MockField} from '../decorators/mock';

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
