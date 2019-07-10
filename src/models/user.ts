import { ArraySerializer } from 'serialize-ts';
import { PrimitiveSerializer } from 'serialize-ts/dist/serializers/primitive.serializer';
import { UserMetrics } from './user-metrics';
import { field, model } from '@junte/mocker-library';

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
    mock: [UserRole.developer]
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
export class UserCard {

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
    mock: [UserRole.developer]
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
