import { field, model } from '../decorators/model';
import { format } from 'date-fns';
import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { DATE_FORMAT } from '../consts';
import { DateSerializer } from '../serializers/date';
import { User } from './user';

export enum MetricsGroup {
  day = 'day',
  week = 'week'
}

@model()
export class UserProgressMetrics {

  @field({
    serializer: new DateSerializer(),
    mock: ''
  })
  start: Date;

  @field({
    serializer: new DateSerializer(),
    mock: ''
  })
  end: Date;

  @field({mock: ''})
  timeEstimate: number;

  @field({mock: ''})
  timeSpent: number;

  @field({mock: ''})
  timeRemains: number;

  @field({mock: ''})
  plannedWorkHours: number;

  @field({mock: ''})
  efficiency: number;

  @field({mock: ''})
  loading: number;

  @field({mock: ''})
  payrollClosed: number;

  @field({mock: ''})
  payrollOpened: number;

  @field({mock: ''})
  payroll: number;

  @field({mock: ''})
  paid: number;

  @field({mock: ''})
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

  @field({mock: ''})
  user: User;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(UserProgressMetrics)),
    mock: ''
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

  @field()
  count: number;

  @field()
  openedCount: number;

  @field()
  openedEstimated: number;
}
