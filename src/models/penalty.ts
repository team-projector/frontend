import { ArraySerializer } from 'serialize-ts';
import { DEFAULT_PAGE_SIZE } from '../consts';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { LazyModel } from '../serializers/model';
import { faker } from '../utils/mocks';
import { ModelRef } from '../utils/types';
import { Paging } from './paging';
import { Salary } from './salary';
import { User } from './user';

@model()
export class Penalty {

  @field({mock: () => faker.random.number()})
  id: number;

  @field({mock: faker.date.future(), serializer: new DateSerializer()})
  createdAt: Date;

  @field({mock: User})
  user: User;

  @field({mock: User})
  createdBy: User;

  @field({mock: () => faker.random.number()})
  sum: number;

  @field()
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
    Object.assign(this, defs || {offset: 0, first: DEFAULT_PAGE_SIZE});
  }

}
