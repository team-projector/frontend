import {ArraySerializer, Field, Model, Type} from 'serialize-ts';
import {MockClass, MockField} from '../decorators/mock';
import {User, UserPermission} from './user';
import {PrimitiveSerializer} from 'serialize-ts/dist/serializers/primitive.serializer';

@Model()
@MockClass()
export class Me extends User {

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField([UserPermission.inviteUser])
  permissions: UserPermission[];

}
