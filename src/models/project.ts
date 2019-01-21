import {Field, Model} from 'serialize-ts';
import {MockClass, MockField} from '../decorators/mock';

@Model()
@MockClass()
export class Project {

  @Field()
  @MockField('{{id}}')
  id: number;

  @Field()
  @MockField('{{project}}')
  title: string;

}
