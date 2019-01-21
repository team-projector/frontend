import {ArraySerializer, Field, Model, Name, Type} from 'serialize-ts';
import {MockField, MockClass} from '../decorators/mock';
import {UserPermission, UserRole} from './user';
import {PrimitiveSerializer} from 'serialize-ts/dist/serializers/primitive.serializer';

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
