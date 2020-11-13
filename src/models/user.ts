import { SearchFilter } from '@junte/ui';
import { endOfDay, endOfWeek, format, isPast, startOfDay, startOfWeek } from 'date-fns';
import { ArraySerializer, PrimitiveSerializer } from 'serialize-ts';
import { Paging } from 'src/models/paging';
import { EdgesToArray, EdgesToPaging } from 'src/serializers/graphql';
import { DATE_FORMAT, DFNS_LOCALE, DFNS_OPTIONS, FIRST_DAY_OF_WEEK } from '../consts';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { faker, mocks, TimeAccuracy } from '../utils/mocks';
import { ModelRef } from '../utils/types';
import { Metrics } from './enums/metrics';
import { UserPermission, UserProblem, UserRole } from './enums/user';
import { IssuesMetrics, MergeRequestsMetrics } from './metrics';
import { WorkBreak } from './work-break';

@model()
export class UserMetrics {

  @field({mock: () => mocks.random(50, 120)})
  bonus: number;

  @field({mock: () => mocks.random(90, 120)})
  penalty: number;

  @field({mock: () => mocks.random(800, 1600)})
  payroll: number;

  @field({mock: () => mocks.random(450, 750)})
  payrollClosed: number;

  @field({mock: () => mocks.random(300, 700)})
  payrollOpened: number;

  @field({mock: () => mocks.random(100, 140)})
  taxes: number;

  @field({mock: () => mocks.random(55, 90)})
  taxesClosed: number;

  @field({mock: () => mocks.random(35, 50)})
  taxesOpened: number;

  @field({mock: () => mocks.random(2, 13)})
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

  @field({
    mock: () => faker.helpers.randomize([
      'Junior Backend',
      'Senior Frontend',
      'iOS Developer'
    ])
  })
  title: string;
}

@model()
export class User {

  @field({mock: context => context?.id || faker.random.uuid()})
  id: string;

  @field({mock: () => faker.internet.userName()})
  login: string;

  @field({mock: () => faker.name.findName()})
  name: string;

  @field({name: 'glAvatar', mock: () => faker.internet.avatar()})
  avatar: string;

  @field({mock: () => mocks.hourlyRate()})
  hourRate: number;

  @field({mock: () => mocks.hourlyRate()})
  customerHourRate: number;

  @field({mock: () => mocks.random(15000, 30000)})
  taxRate: number;

  @field({mock: () => mocks.random(2, 8)})
  dailyWorkHours: number;

  @field({mock: () => mocks.random(8, 18)})
  annualPaidWorkBreaksDays: number;

  @field({mock: UserPosition})
  position: UserPosition;

  @field({
    serializer: new EdgesToArray<WorkBreak>(() => WorkBreak),
    mock: {type: () => WorkBreak, length: 5}
  })
  workBreaks: ModelRef<WorkBreak>[];

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: [UserRole.developer,
      UserRole.leader,
      UserRole.manager,
      UserRole.shareholder,
      UserRole.customer]
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
    me.roles = [];
    switch (localStorage.role) {
      case UserRole.developer:
        me.roles.push(UserRole.developer);
        break;
      case UserRole.leader:
        me.roles.push(UserRole.developer);
        me.roles.push(UserRole.leader);
        break;
      case UserRole.manager:
        me.roles.push(UserRole.developer);
        me.roles.push(UserRole.leader);
        me.roles.push(UserRole.manager);
        break;
      case UserRole.shareholder:
      default:
        me.roles.push(UserRole.developer);
        me.roles.push(UserRole.leader);
        me.roles.push(UserRole.manager);
        me.roles.push(UserRole.shareholder);
        break;
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
  mocking: (metrics: UserProgressMetrics, {group, start, end}: UserMetricsFilter) => {
    const day = faker.date.between(start, end);
    switch (group) {
      case Metrics.week:
        metrics.start = startOfWeek(day, DFNS_OPTIONS);
        metrics.end = endOfWeek(day, DFNS_OPTIONS);
        metrics.timeSpent = mocks.time(50, 60, TimeAccuracy.hours);
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

  @field({mock: () => faker.date.recent(30), serializer: new DateSerializer()})
  start: Date;

  @field({mock: () => faker.date.recent(30), serializer: new DateSerializer()})
  end: Date;

  @field({mock: () => mocks.random(100, 230) * 1800})
  timeEstimate: number;

  @field({mock: () => mocks.time(5, 10, TimeAccuracy.hours)})
  timeSpent: number;

  @field({mock: () => mocks.random(1, 8) * 1800})
  timeRemains: number;

  @field({mock: () => mocks.random(4, 9)})
  plannedWorkHours: number;

  @field({mock: () => mocks.efficiency()})
  efficiency: number;

  @field({mock: () => mocks.random(1, 8) * 1800})
  loading: number;

  @field({mock: () => mocks.random(25, 43) * 10})
  payrollClosed: number;

  @field({mock: () => mocks.random(25, 43) * 10})
  payrollOpened: number;

  @field({mock: () => mocks.random(7, 30)})
  payroll: number;

  @field({mock: () => mocks.random(35, 55) * 10})
  paid: number;

  @field({mock: () => mocks.random(7, 30)})
  issuesCount: number;

  getKey(): string {
    return format(this.start, DATE_FORMAT, DFNS_OPTIONS);
  }

}

@model()
export class UsersPaging implements Paging<User> {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<User>(User)),
    mock: {type: User, length: 10}
  })
  results: User[];

}

@model()
export class UsersFilter implements SearchFilter {

  @field()
  first: number;

  @field()
  offset: number;

  constructor(defs: Partial<UsersFilter> = null) {
    Object.assign(this, defs);
  }

}
