import { ArraySerializer, Field, Model, ModelSerializer, Name, Type } from 'serialize-ts';
import { MockClass, MockField, MockFieldNested } from '../decorators/mock';
import { DateSerializer } from '../serializers/date';
import { Paging } from './paging';
import { SearchFilter } from 'junte-ui';
import { IssueCard } from './issue';

@Model()
@MockClass()
export class Salary {

  @Field()
  @MockFieldNested('{{int 1 1000}}')
  id: number;

  @Field()
  @Name('charged_time')
  @MockFieldNested('{{int 144000 288000}}')
  chargedTime: number;

  @Field()
  @MockFieldNested('{{boolean}}')
  payed: boolean;

  @Field()
  @MockFieldNested('{{int 1000 5000}}')
  bonus: number;

  @Field()
  @Name('created_at')
  @Type(new DateSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  createdAt: Date;

  @Field()
  @Name('period_to')
  @Type(new DateSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  periodTo: Date;

  @Field()
  @Name('period_from')
  @Type(new DateSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  periodFrom: Date;

  @Field()
  @MockFieldNested('{{int 250 500}}')
  taxes: number;

  @Field()
  @MockFieldNested('{{int 500 1000}}')
  penalty: number;

  @Field()
  @MockFieldNested('{{int 10000 20000}}')
  sum: number;

  @Field()
  @MockFieldNested('{{int 30000 50000}}')
  total: number;

  @Field()
  @MockFieldNested('{{> issue_card}}')
  issue: IssueCard;

}

@Model()
@MockClass()
export class PagingSalaries implements Paging<Salary> {

  @Field()
  @MockFieldNested('{{int 10 20}}')
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(Salary)))
  @MockFieldNested('[{{#repeat 5 15}} {{> salary }} {{/repeat}}]')
  results: Salary[];

}

@Model()
export class SalariesFilter implements SearchFilter {

  @Field()
  page?: number;

  @Field()
  @Name('page_size')
  pageSize?: number;

  constructor(defs: SalariesFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
