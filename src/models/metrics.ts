import { endOfDay, endOfMonth, endOfWeek, format, isPast, startOfDay, startOfMonth, startOfToday, startOfWeek } from 'date-fns';
import * as faker from 'faker';
import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { DATE_FORMAT } from '../consts';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { mocks } from '../utils/mocks';
import { User } from './user';

export enum MetricsGroup {
  day = 'day',
  week = 'week'
}

@model({
  mocking: (metrics: UserProgressMetrics, filter: UserMetricsFilter) => {
    const today = startOfToday();
    const day = faker.date.between(startOfMonth(today), endOfMonth(today));
    switch (filter.group) {
      case MetricsGroup.week:
        metrics.start = startOfWeek(day, {weekStartsOn: 1});
        metrics.end = endOfWeek(day, {weekStartsOn: 1});
        break;
      case MetricsGroup.day:
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

  @field({mock: () => faker.random.number({min: 0.5, max: 1})})
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
    return format(this.start, 'DD/MM/YYYY');
  }

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
  group: MetricsGroup;

  constructor(defs: UserMetricsFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@model()
export class TeamProgressMetrics {

  @field()
  user: User;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(UserProgressMetrics)),
    mock: {type: UserProgressMetrics, length: 10}
  })
  metrics: UserProgressMetrics[];
}

@model()
export class TeamMetricsFilter {

  @field()
  team: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  start: Date;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  end: Date;

  @field()
  group: MetricsGroup;

  constructor(defs: TeamMetricsFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@model()
export class IssuesMetrics {

  @field({mock: () => faker.random.number({max: 100})})
  count: number;

  @field({mock: () => faker.random.number({max: 100})})
  openedCount: number;

  @field({mock: () => faker.random.number({min: 3600, max: 10000})})
  openedEstimated: number;
}
