import {Field, Model, Name, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {MomentSerializer} from '../serializers/moment';
import {Moment} from 'moment';

@Model()
@MockClass()
export class DayMetrics {

  @Field()
  @Type(new MomentSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  date: Moment;

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
  @MockFieldNested('{{money}}')
  earnings: number;

}

@Model()
@MockClass()
export class WeekMetrics {

  @Field()
  @Type(new MomentSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  date: Moment;

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
  @MockFieldNested('{{money}}')
  earnings: number;

}
