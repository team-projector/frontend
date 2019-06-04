import { Field, Model, Name, Type } from 'serialize-ts';
import { MockClass, MockField, MockFieldNested } from '../decorators/mock';
import { DateSerializer } from '../serializers/date';
import { DATE_FORMAT } from '../consts';
import { format } from 'date-fns';

export enum MetricsGroup {
  day = 'day',
  week = 'week'
}

@Model()
@MockClass()
export class UserProgressMetrics {

  @Field()
  @Type(new DateSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  start: Date;

  @Field()
  @Type(new DateSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  end: Date;

  @Field()
  @Name('time_estimate')
  @MockFieldNested('{{int 10000 100000}}')
  timeEstimate: number;

  @Field()
  @Name('time_spent')
  @MockFieldNested('{{int 10000 100000}}')
  timeSpent: number;

  @Field()
  @Name('time_remains')
  @MockFieldNested('{{int 10000 100000}}')
  timeRemains: number;

  @Field()
  @Name('planned_work_hours')
  @MockFieldNested('{{int 8 10}}')
  plannedWorkHours: number;

  @Field()
  @MockFieldNested('{{efficiency}}')
  efficiency: number;

  @Field()
  @MockFieldNested('{{int 200000 300000}}')
  loading: number;

  @Field()
  @Name('payroll_closed')
  @MockFieldNested('{{money}}')
  payrollClosed: number;

  @Field()
  @Name('payroll_opened')
  @MockFieldNested('{{money}}')
  payrollOpened: number;

  @Field()
  @MockFieldNested('{{money}}')
  payroll: number;

  @Field()
  @MockFieldNested('{{money}}')
  paid: number;

  @Field()
  @Name('issues_count')
  @MockFieldNested('{{int 50 1000}}')
  issuesCount: number;

  getKey(): string {
    return format(this.start, 'DD/MM/YYYY');
  }

}

@Model()
export class UserMetricsFilter {

  @Field()
  @Type(new DateSerializer(DATE_FORMAT))
  start?: Date;

  @Field()
  @Type(new DateSerializer(DATE_FORMAT))
  end?: Date;

  @Field()
  group?: MetricsGroup;

  constructor(defs: UserMetricsFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
