import * as faker from 'faker';
import { ArraySerializer, PrimitiveSerializer } from 'serialize-ts';
import { UserPermission, UserProblem, UserRole } from 'src/models/enums/user';
import { field, model } from '../decorators/model';

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

@model({
  mocking: (me: Me) => {
    if (!!localStorage.role) {
      me.roles = [];
      switch (localStorage.role) {
        case UserRole.developer:
          me.roles.push(UserRole.developer);
          break;
        case UserRole.teamLeader:
          me.roles.push(UserRole.developer);
          me.roles.push(UserRole.teamLeader);
          break;
        case UserRole.projectManager:
          me.roles.push(UserRole.developer);
          me.roles.push(UserRole.teamLeader);
          me.roles.push(UserRole.projectManager);
          break;
      }
    }
  }
})
export class Me extends User {

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: [UserPermission.inviteUser]
  })
  permissions: UserPermission[];

}
