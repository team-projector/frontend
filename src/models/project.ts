import {Field, Name, Model} from 'serialize-ts';
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

  @Field()
  @MockField('{{project}}')
  fullTitle: string;

  @Field()
  @Name('gl_url')
  @MockField('{{url}}')
  glUrl: string;
}

@Model()
@MockClass()
export class ProjectGroup {

  @Field()
  @MockField('{{id}}')
  id: number;

  @Field()
  @MockField('{{project}}')
  title: string;

  @Field()
  @Name('gl_url')
  @MockField('{{url}}')
  glUrl: string;

}
