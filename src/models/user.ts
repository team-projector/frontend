import { field, model } from '../decorators/model';
import { ArraySerializer, PrimitiveSerializer } from 'serialize-ts';
import * as faker from 'faker';

export enum UserPermission {
  inviteUser = 'invite_user',
}

export enum UserRole {
  developer = 'DEVELOPER',
  teamLeader = 'TEAM_LEADER',
  projectManager = 'PROJECT_MANAGER',
  customer = 'CUSTOMER',
  shareholder = 'SHAREHOLDER'
}

export enum UserProblem {
  payrollOpenedOverflow = 'PAYROLL_OPENED_OVERFLOW'
}

@model()
export class IssuesMetrics {

  @field({mock: () => faker.random.number()})
  openedCount: number;

  @field({mock: () => faker.random.number()})
  openedSpent: number;

  @field({mock: () => faker.random.number()})
  closedSpent: number;

}

@model()
export class UserMetrics {

  @field({mock: () => faker.random.number()})
  bonus: number;

  @field({mock: () => faker.random.number()})
  penalty: number;

  @field({mock: () => faker.random.number()})
  payrollClosed: number;

  @field({mock: () => faker.random.number()})
  payrollOpened: number;

  @field()
  issues: IssuesMetrics;

  @field()
  mergeRequests: IssuesMetrics;

}

@model()
export class User {

  @field({mock: () => faker.random.uuid()})
  id: string;

  @field({mock: () => faker.internet.userName()})
  login: string;

  @field({mock: () => faker.name.findName()})
  name: string;

  @field({name: 'glAvatar', mock: () => faker.internet.avatar()})
  avatar: string;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: [UserRole.developer,
      UserRole.customer,
      UserRole.projectManager,
      UserRole.shareholder,
      UserRole.teamLeader]
  })
  roles: UserRole[];

  @field()
  metrics: UserMetrics;

  @field({
    mock: [UserProblem.payrollOpenedOverflow],
    serializer: new ArraySerializer(new PrimitiveSerializer())
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
