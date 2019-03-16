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
export class UserMetrics {

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
  @MockFieldNested('{{time}}')
  timeEstimate: number;

  @Field()
  @Name('time_spent')
  @MockFieldNested('{{time}}')
  timeSpent: number;

  @Field()
  @Name('time_remains')
  @MockFieldNested('{{time}}')
  timeRemains: number;

  @Field()
  @MockFieldNested('{{efficiency}}')
  efficiency: number;

  @Field()
  @MockFieldNested('{{time}}')
  loading: number;

  @Field()
  @MockFieldNested('{{money}}')
  earnings: number;

  @Field()
  @MockFieldNested('{{int 50 1000}}')
  issues_count: number;

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
