import { SearchFilter } from '@junte/ui';
import { endOfDay, endOfWeek, format, isPast, startOfDay, startOfWeek } from 'date-fns';
import { ArraySerializer, PrimitiveSerializer } from '@junte/serialize-ts';
import { Paging } from 'src/models/paging';
import { EdgesToArray, EdgesToPaging } from 'src/serializers/graphql';
import { DATE_FORMAT, DFNS_OPTIONS } from '../consts';
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

  @field()
  bonus: number;

  @field()
  penalty: number;

  @field()
  payroll: number;

  @field()
  payrollClosed: number;

  @field()
  payrollOpened: number;

  @field()
  taxes: number;

  @field()
  taxesClosed: number;

  @field()
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

@model({
  mocking: (user: User) => {
    user.hourRate = mocks.hourlyRate(10, 20);
    user.dailyWorkHours = mocks.random(6, 8);
    const payroll = user.hourRate * user.dailyWorkHours * 10;
    user.metrics.payroll = payroll;
    user.metrics.payrollOpened = payroll * mocks.percents(30, 60);
    user.metrics.payrollClosed = payroll - user.metrics.payrollOpened;
    user.metrics.penalty = payroll * mocks.percents(5, 15);
    user.metrics.bonus = payroll * mocks.percents(5, 15);
    const taxRate = mocks.percents(20, 40);
    user.taxRate = taxRate;
    user.metrics.taxes = payroll * taxRate;
    user.metrics.taxesOpened = user.metrics.payrollOpened * taxRate;
    user.metrics.taxesClosed = user.metrics.payrollClosed * taxRate;
  }
})
export class User {

  @field({mock: context => context?.id || mocks.id()})
  id: string;

  @field({mock: () => faker.internet.userName()})
  login: string;

  @field({mock: () => faker.name.findName()})
  name: string;

  @field({name: 'glAvatar', mock: () => mocks.avatar()})
  avatar: string;

  @field()
  hourRate: number;

  @field()
  customerHourRate: number;

  @field()
  taxRate: number;

  @field()
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
        metrics.timeSpent = mocks.time(35, 48, TimeAccuracy.hours);
        metrics.timeEstimate = mocks.time(38, 42);
        metrics.efficiency = metrics.timeEstimate / metrics.timeSpent;
        metrics.payroll = metrics.timeSpent / 3600 * mocks.hourlyRate();
        metrics.paid = metrics.payroll * mocks.percents(70, 100);
        break;
      case Metrics.day:
      default:
        metrics.start = startOfDay(day);
        metrics.end = endOfDay(day);
        if (isPast(metrics.end)) {
          metrics.timeSpent = mocks.time(4, 9);
        }
    }
  }
})
export class UserProgressMetrics {

  @field({mock: () => faker.date.recent(30), serializer: new DateSerializer()})
  start: Date;

  @field({mock: () => faker.date.recent(30), serializer: new DateSerializer()})
  end: Date;

  @field({mock: () => mocks.time(15, 18) / 2})
  timeEstimate: number;

  @field()
  timeSpent: number;

  @field({mock: () => mocks.time(10, 16) / 2})
  timeRemains: number;

  @field({mock: () => mocks.random(4, 9)})
  plannedWorkHours: number;

  @field({mock: () => mocks.efficiency()})
  efficiency: number;

  @field({mock: () => mocks.time(10, 16) / 2})
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
