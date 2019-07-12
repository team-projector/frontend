import { DateSerializer } from '../serializers/date';
import { DATE_FORMAT } from '../consts';
import { format } from 'date-fns';
import { field, model } from '@junte/mocker-library';

export enum MetricsGroup {
  day = 'day',
  week = 'week'
}

@model()
export class UserProgressMetrics {

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  start: Date;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  end: Date;

  @field({
    name: 'time_estimate',
    mock: '{{int 10000 100000}}'
  })
  timeEstimate: number;

  @field({
    name: 'time_spent',
    mock: '{{int 10000 100000}}'
  })
  timeSpent: number;

  @field({
    name: 'time_remains',
    mock: '{{int 10000 100000}}'
  })
  timeRemains: number;

  @field({
    name: 'planned_work_hours',
    mock: '{{int 8 10}}'
  })
  plannedWorkHours: number;

  @field({mock: '{{efficiency}}'})
  efficiency: number;

  @field({mock: '{{int 200000 300000}}'})
  loading: number;

  @field({
    name: 'payroll_closed',
    mock: '{{money}}'
  })
  payrollClosed: number;

  @field({
    name: 'payroll_opened',
    mock: '{{money}}'
  })
  payrollOpened: number;

  @field({mock: '{{money}}'})
  payroll: number;

  @field({mock: '{{money}}'})
  paid: number;

  @field({
    name: 'issues_count',
    mock: '{{int 50 1000}}'
  })
  issuesCount: number;

  getKey(): string {
    return format(this.start, 'DD/MM/YYYY');
  }

}

@model()
export class UserMetricsFilter {

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  start?: Date;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  end?: Date;

  @field()
  group?: MetricsGroup;

  constructor(defs: UserMetricsFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
