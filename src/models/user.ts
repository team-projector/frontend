import { field, model } from '@junte/mocker-library';
import { ArraySerializer, PrimitiveSerializer } from 'serialize-ts';

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
export class IssuesMetrics {

  @field({mock: '{{int 1000 20000}}'})
  openedCount: number;

  @field({mock: '{{int 3600 18000}}'})
  openedSpent: number;

  @field({mock: '{{int 3600 18000}}'})
  closedSpent: number;

}

@model()
export class UserMetrics {

  @field({mock: '{{money}}'})
  bonus: number;

  @field({mock: '{{money}}'})
  penalty: number;

  @field({mock: '{{int 10 100}}'})
  payrollClosed: number;

  @field({mock: '{{int 1000 20000}}'})
  payrollOpened: number;

  @field({mock: '{{> issues_metrics}}'})
  issues: IssuesMetrics;

  @field({mock: '{{> issues_metrics}}'})
  mergeRequests: IssuesMetrics;

}

@model()
export class User {

  @field({mock: '{{int 0 100}}'})
  id: string;

  @field({mock: '{{login}}'})
  login: string;

  @field({mock: '{{firstName}} {{lastName}}'})
  name: string;

  @field({
    name: 'glAvatar',
    mock: '{{avatar}}'
  })
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
export class Me extends User {

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: [UserPermission.inviteUser]
  })
  permissions: UserPermission[];

}
