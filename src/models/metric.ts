import {Field, Model, Name, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {MomentSerializer} from '../serializers/moment';
import {Moment} from 'moment';
import {DATE_FORMAT} from '../consts';

export enum MetricsGroup {
  day = 'day',
  week = 'week'
}

@Model()
@MockClass()
export class Metric {

  @Field()
  @Type(new MomentSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  start: Moment;

  @Field()
  @Type(new MomentSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  end: Moment;

  @Field()
  @Name('time_estimate')
  @MockFieldNested('{{time}}')
  timeEstimate: number;

  @Field()
  @Name('time_spent')
  @MockFieldNested('{{time}}')
  timeSpent: number;

  @Field()
  @MockFieldNested('{{efficiency}}')
  efficiency: number;

  @Field()
  @MockFieldNested('{{time}}')
  loading: number;

  @Field()
  @MockFieldNested('{{money}}')
  earnings: number;

  getKey(): string {
    return this.start.format('L');
  }

}

@Model()
export class MetricFilter {

  @Field()
  user?: number;

  @Field()
  @Type(new MomentSerializer(DATE_FORMAT))
  start?: Moment;

  @Field()
  @Type(new MomentSerializer(DATE_FORMAT))
  end?: Moment;

  @Field()
  group?: MetricsGroup;

  constructor(defs: MetricFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
