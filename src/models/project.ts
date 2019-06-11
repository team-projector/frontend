import {Field, Name, Model} from 'serialize-ts';
import {MockClass, MockField} from '../decorators/mock';

@Model()
@MockClass()
export class ProjectCard {

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

@Model()
@MockClass()
export class ProjectGroupCard {

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
