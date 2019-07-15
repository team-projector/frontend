import {ArraySerializer, ModelSerializer, PrimitiveSerializer} from 'serialize-ts';
import {field, model} from '@junte/mocker-library';
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

@model()
export class User {

  @field({mock: '{{int 0 100}}'})
  id: number;

  @field({mock: '{{login}}'})
  login: string;

  @field({mock: '{{firstName}} {{lastName}}'})
  name: string;

  @field({mock: '{{avatar}}'})
  avatar: string;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: [UserRole.developer, UserRole.customer, UserRole.projectManager, UserRole.shareholder, UserRole.teamLeader]
  })
  roles: UserRole[];

  @field({mock: '{{> user_metrics}}'})
  metrics: UserMetrics;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: '{{user_problem}}'
  })
  problems: UserProblem[];

}

@model()
export class PagingUsers implements Paging<User> {

  @field({mock: '{{int 50 1000}}'})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new ModelSerializer(User)),
    mock: '[{{#repeat 10 20}} {{> user}} {{/repeat}}]'
  })
  results: User[];
}
