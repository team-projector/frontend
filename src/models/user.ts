import {ArraySerializer, Field, Model, Name, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {PrimitiveSerializer} from 'serialize-ts/dist/serializers/primitive.serializer';

export enum UserPermission {
  inviteUser = 'intite_user',
}

export enum UserRole {
  developer = 'developer',
  teamLeader = 'team_leader',
  projectManager = 'project_manager'
}

@Model()
@MockClass()
export class User {

  @Field()
  @MockFieldNested('{{int 0 100}}')
  id: number;

  @Field()
  @MockField('{{login}}')
  login: string;

  @Field()
  @Name('first_name')
  @MockField('{{firstName}} {{lastName}}')
  name: string;

  @Field()
  @MockField('{{avatar}}')
  avatar: string;

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField([UserRole.developer])
  roles: UserRole[];

}
