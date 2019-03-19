import {ArraySerializer, Field, Model, Name, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {PrimitiveSerializer} from 'serialize-ts/dist/serializers/primitive.serializer';
import {ObjectLink} from './object-link';
import {UserMetrics} from './user-metrics';

export enum UserPermission {
  inviteUser = 'intite_user',
}

export enum UserRole {
  developer = 'developer',
  teamLeader = 'team_leader',
  projectManager = 'project_manager',
  customer = 'customer',
  shareholder = 'shareholder'
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
  @MockField('{{firstName}} {{lastName}}')
  name: string;

  @Field()
  @MockField('{{avatar}}')
  avatar: string;

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField([UserRole.developer])
  roles: UserRole[];

  @Field()
  @MockFieldNested('{{> user_metrics}}')
  metrics: UserMetrics;

}

@Model()
@MockClass()
export class UserCard {

  @Field()
  @MockFieldNested('{{int 0 100}}')
  id: number;

  @Field()
  @MockField('{{login}}')
  login: string;

  @Field()
  @MockField('{{firstName}} {{lastName}}')
  name: string;

  @Field()
  @MockField('{{avatar}}')
  avatar: string;

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField([UserRole.developer])
  roles: UserRole[];

  @Field()
  @MockFieldNested('{{> user_metrics}}')
  metrics: UserMetrics;

}
