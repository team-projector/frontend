import {Field} from 'serialize-ts';
import {MockClass, MockField} from '../decorators/mock';

@MockClass()
export class Label {

  @Field()
  @MockField('{{label}}')
  title: string;

  @Field()
  @MockField('{{color}}')
  color: string;

}
