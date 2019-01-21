import {Field} from 'serialize-ts';
import {MockClass, MockField} from '../decorators/mock';

@MockClass()
export class LabelCard {

  @Field()
  @MockField('{{title}}')
  title: string;

  @Field()
  @MockField('{{color}}')
  color: string;

}
