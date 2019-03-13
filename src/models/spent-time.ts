import {ArraySerializer, Field, Model, ModelSerializer, Name, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {Paging} from './paging';
import {Moment} from 'moment';
import {MomentSerializer} from '../serializers/moment';
import {IssueCard} from './issue';
import {DATE_FORMAT} from '../consts';

@Model()
@MockClass()
export class SpentTimeCard {

  @Field()
  @MockField('{{id}}')
  id: number;

  @Field()
  @Name('created_at')
  @Type(new MomentSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  createdAt: Moment;

  @Field()
  @Type(new MomentSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  date: Moment;

  @Field()
  @MockFieldNested('{{> issue_card}}')
  issue: IssueCard;

  @Field()
  @Name('time_spent')
  @MockFieldNested('{{time}}')
  timeSpent: number;

  @Field()
  @MockFieldNested('{{money}}')
  earnings: number;
}

@Model()
@MockClass()
export class PagingTimeExpenses implements Paging<SpentTimeCard> {

  @Field()
  @MockFieldNested('{{int 50 1000}}')
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(SpentTimeCard)))
  @MockFieldNested('[{{#repeat 10 20}} {{> spent_time_card}} {{/repeat}}]')
  results: SpentTimeCard[];

}

@Model()
export class TimeExpensesFilter {

  @Field()
  user?: number;

  @Field()
  @Type(new MomentSerializer(DATE_FORMAT))
  date?: Moment;

  @Field()
  page: number;

  @Field()
  @Name('page_size')
  pageSize: number;

  constructor(defs: TimeExpensesFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
