import { endOfDay, endOfMonth, endOfWeek, format, isPast, startOfDay, startOfMonth, startOfToday, startOfWeek } from 'date-fns';
import { Paging } from 'src/models/paging';
import { EdgesToArray, EdgesToPaging } from 'src/serializers/graphql';
import { WorkBreak } from './work-break';
import { faker } from '../utils/mocks';
import { ArraySerializer, PrimitiveSerializer, ModelSerializer } from 'serialize-ts';
import { UserPermission, UserProblem, UserRole } from './enums/user';
import { DATE_FORMAT } from '../consts';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { mocks } from '../utils/mocks';
import { Metrics } from './enums/metrics';
import { IssuesMetrics, MergeRequestsMetrics } from './metrics';

@model()
export class UserMetrics {

  @field({mock: () => faker.random.number()})
  bonus: number;

  @field({mock: () => faker.random.number()})
  penalty: number;

  @field({mock: () => faker.random.number()})
  payroll: number;

  @field({mock: () => faker.random.number()})
  payrollClosed: number;

  @field({mock: () => faker.random.number()})
  payrollOpened: number;

  @field({mock: () => faker.random.number()})
  taxes: number;

  @field({mock: () => faker.random.number()})
  taxesClosed: number;

  @field({mock: () => faker.random.number()})
  taxesOpened: number;

  @field({mock: () => faker.random.number()})
  paidWorkBreaksDays: number;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  lastSalaryDate: Date;

  @field({mock: IssuesMetrics})
  issues: IssuesMetrics;

  @field({mock: MergeRequestsMetrics})
  mergeRequests: MergeRequestsMetrics;

}

@model()
export class UserPosition {

  @field({mock: () => faker.name.findName()})
  title: string;
}

@model()
export class User {

  @field({mock: context => !!context && !!context.id ? context.id : faker.random.uuid()})
  id: string;

  @field({mock: () => faker.internet.userName()})
  login: string;

  @field({mock: () => faker.name.findName()})
  name: string;

  @field({name: 'glAvatar', mock: () => faker.internet.avatar()})
  avatar: string;

  @field({mock: () => faker.random.number()})
  hourRate: number;

  @field({mock: () => faker.random.number()})
  taxRate: number;

  @field({mock: () => faker.random.number()})
  annualPaidWorkBreaksDays: number;

  @field({mock: UserPosition})
  position: UserPosition;

  @field({
    serializer: new EdgesToArray<WorkBreak>(WorkBreak),
    mock: {type: WorkBreak, length: 10}
  })
  workBreaks: WorkBreak[];

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: [UserRole.developer,
      UserRole.customer,
      UserRole.projectManager,
      UserRole.shareholder,
      UserRole.teamLeader]
  })
  roles: UserRole[];

  @field({mock: UserMetrics})
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

@model()
export class UserMetricsFilter {

  @field()
  user: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  start: Date;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  end: Date;

  @field()
  group: Metrics;

  constructor(defs: UserMetricsFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@model({
  mocking: (metrics: UserProgressMetrics, filter: UserMetricsFilter) => {
    const today = startOfToday();
    const day = faker.date.between(startOfMonth(today), endOfMonth(today));
    switch (filter.group) {
      case Metrics.week:
        metrics.start = startOfWeek(day, {weekStartsOn: 1});
        metrics.end = endOfWeek(day, {weekStartsOn: 1});
        break;
      case Metrics.day:
      default:
        metrics.start = startOfDay(day);
        metrics.end = endOfDay(day);
    }
    if (isPast(metrics.end)) {
      metrics.timeSpent = mocks.time(0, 9);
    }
  }
})
export class UserProgressMetrics {

  @field()
  start: Date;

  @field()
  end: Date;

  @field({mock: () => faker.random.number()})
  timeEstimate: number;

  @field()
  timeSpent: number;

  @field({mock: () => faker.random.number()})
  timeRemains: number;

  @field({mock: 8})
  plannedWorkHours: number;

  @field({mock: () => mocks.efficiency()})
  efficiency: number;

  @field({mock: () => faker.random.number()})
  loading: number;

  @field({mock: () => faker.random.number()})
  payrollClosed: number;

  @field({mock: () => faker.random.number()})
  payrollOpened: number;

  @field({mock: () => faker.random.number()})
  payroll: number;

  @field({mock: () => faker.random.number()})
  paid: number;

  @field({mock: () => faker.random.number()})
  issuesCount: number;

  getKey(): string {
    return format(this.start, 'dd/MM/yyyy');
  }

}


@model()
export class PagingUsers implements Paging<User> {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<User>(User)),
    mock: {type: User, length: 10}
  })
  results: User[];

}
