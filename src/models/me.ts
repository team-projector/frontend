import {ArraySerializer, Field, Model, Name, Type} from 'serialize-ts';
import {MockField, MockClass} from '../decorators/mock';
import {UserPermission, UserRole} from './user';
import {PrimitiveSerializer} from 'serialize-ts/dist/serializers/primitive.serializer';

@Model()
@MockClass()
export class Me {

  @Field()
  @Name('first_name')
  @MockField('{{firstName}}')
  firstName: string;

  @Field()
  @Name('last_name')
  @MockField('{{lastName}}')
  lastName: string;

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField([UserRole.developer])
  roles: UserRole[];

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField([UserPermission.inviteUser])
  permissions: UserPermission[];

}
