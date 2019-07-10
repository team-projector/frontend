import {ArraySerializer, Field, Model, ModelSerializer, Name, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {Paging} from './paging';
import {DateSerializer} from '../serializers/date';
import {DATE_FORMAT} from '../consts';
import {OwnerSerializer} from '../serializers/owner';
import {MergeRequest} from './merge-request';
import {Issue} from './issue';

@Model()
@MockClass()
export class SpentTime {

  @Field()
  @MockField('{{id}}')
  id: number;

  @Field()
  @Name('created_at')
  @Type(new DateSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  createdAt: Date;

  @Field()
  @Type(new DateSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  date: Date;

  @Field()
  @Type(new OwnerSerializer())
  @MockFieldNested('{{> issue}}')
  owner: Issue | MergeRequest;

  @Field()
  @Name('time_spent')
  @MockFieldNested('{{int 10 100}}')
  timeSpent: number;

  @Field()
  @MockFieldNested('{{money}}')
  earnings: number;
}

@Model()
@MockClass()
export class PagingTimeExpenses implements Paging<SpentTime> {

  @Field()
  @MockFieldNested('{{int 50 1000}}')
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(SpentTime)))
  @MockFieldNested('[{{#repeat 10 20}} {{> spent_time}} {{/repeat}}]')
  results: SpentTime[];

}

@Model()
export class TimeExpensesFilter {

  @Field()
  team?: number;

  @Field()
  user?: number;

  @Field()
  @Type(new DateSerializer(DATE_FORMAT))
  date?: Date;

  @Field()
  salary?: number;

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
