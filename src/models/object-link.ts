import {Field, Model} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';

@Model()
@MockClass()
export class ObjectLink {

  @Field()
  @MockFieldNested('{{int 1 100}}')
  id: number;

  @Field()
  @MockField('{{presentation}}')
  presentation: string;

}

