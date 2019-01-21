import {Field, Name} from 'serialize-ts';
import {MockField, MockClass} from '../decorators/mock';

@MockClass()
export class LabelCard {

  @Field()
  @MockField('{{title}}')
  title: string;

  @Field()
  @MockField('{{color}}')
  color: string;

}
