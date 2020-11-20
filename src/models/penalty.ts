import { ArraySerializer } from 'serialize-ts';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { LazyModel } from '../serializers/model';
import { faker, mocks } from '../utils/mocks';
import { ModelRef } from '../utils/types';
import { Paging } from './paging';
import { Salary } from './salary';
import { User } from './user';

@model()
export class Penalty {

  @field({mock: () => mocks.id()})
  id: number;

  @field({mock: () => faker.date.recent(200), serializer: new DateSerializer()})
  createdAt: Date;

  @field({mock: User})
  user: User;

  @field({mock: User})
  createdBy: User;

  @field({mock: () => mocks.random(30, 100)})
  sum: number;

  @field({
    mock: () => faker.helpers.randomize([
      $localize`:@@mocks.penalty_comment_overdue:Overdue`,
      $localize`:@@mocks.penalty_comment_bug:Your code generated bug`
    ])
  })
  comment: string;

  @field({serializer: new LazyModel(() => Salary)})
  salary: ModelRef<Salary>;
}

@model()
export class PagingPenalties implements Paging<Penalty> {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Penalty>(Penalty)),
    mock: {type: Penalty, length: 10}
  })
  results: Penalty[];
}

@model()
export class PenaltiesFilter {

  @field()
  user: string;

  @field()
  salary: string;

  @field()
  first: number;

  @field()
  offset: number;

  constructor(defs: Partial<PenaltiesFilter> = null) {
    Object.assign(this, defs);
  }

}
