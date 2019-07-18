import {ArraySerializer, ModelSerializer} from 'serialize-ts';
import {DateSerializer} from '../serializers/date';
import {DATE_FORMAT} from '../consts';
import {field, model} from '@junte/mocker-library';
import {User} from './user';
import {format} from 'date-fns';

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

  @field({mock: '{{int 10000 100000}}'})
  timeEstimate: number;

  @field({mock: '{{int 10000 100000}}'})
  timeSpent: number;

  @field({mock: '{{int 10000 100000}}'})
  timeRemains: number;

  @field({mock: '{{int 8 10}}'})
  plannedWorkHours: number;

  @field({mock: '{{efficiency}}'})
  efficiency: number;

  @field({mock: '{{int 200000 300000}}'})
  loading: number;

  @field({mock: '{{money}}'})
  payrollClosed: number;

  @field({mock: '{{money}}'})
  payrollOpened: number;

  @field({mock: '{{money}}'})
  payroll: number;

  @field({mock: '{{money}}'})
  paid: number;

  @field({mock: '{{int 50 1000}}'})
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

  @field({mock: '{{int 1 10}}'})
  user: User;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(UserProgressMetrics)),
    mock: '[{{#repeat 5 15}} {{> team_member }} {{/repeat}}]'
  })
  metrics: UserProgressMetrics[];
}

@model()
export class TeamMetricsFilter {

  @field()
  team: number;

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
