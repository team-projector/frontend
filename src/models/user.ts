import {ArraySerializer, Field, Model, ModelSerializer, Name, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {PrimitiveSerializer} from 'serialize-ts/dist/serializers/primitive.serializer';
import {UserMetrics} from './user-metrics';
import {Paging} from './paging';

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

export enum UserProblem {
  payrollOpenedOverflow = 'payroll_opened_overflow'
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
  @MockField([UserRole.developer, UserRole.customer, UserRole.projectManager, UserRole.shareholder, UserRole.teamLeader])
  roles: UserRole[];

  @Field()
  @MockFieldNested('{{> user_metrics}}')
  metrics: UserMetrics;

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField('{{user_problem}}')
  problems: UserProblem[];

}

@Model()
@MockClass()
export class PagingUsers implements Paging<User> {

  @Field()
  @MockFieldNested('{{int 50 1000}}')
  count: number;

  @Field()
  @Name('edges')
  @Type(new ArraySerializer(new ModelSerializer(User)))
  @MockFieldNested('[{{#repeat 10 20}} {{> user}} {{/repeat}}]')
  results: User[];

}
