import { ArraySerializer } from 'serialize-ts';
import { DEFAULT_PAGE_SIZE } from '../consts';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { ModelSerializer } from '../serializers/model';
import { faker } from '../utils/mocks';
import { ModelRef } from '../utils/types';
import { Paging } from './paging';
import { Salary } from './salary';
import { User } from './user';

@model()
export class Bonus {

  @field({mock: () => faker.random.number()})
  id: number;

  @field({mock: faker.date.future(), serializer: new DateSerializer()})
  createdAt: Date;

  @field({mock: User})
  createdBy: User;

  @field({mock: () => faker.random.number()})
  sum: number;

  @field()
  comment: string;

  @field({serializer: new ModelSerializer(() => Salary)})
  salary: ModelRef<Salary>;
}

@model()
export class PagingBonuses implements Paging<Bonus> {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Bonus>(Bonus)),
    mock: {type: Bonus, length: 10}
  })
  results: Bonus[];
}

@model()
export class BonusesFilter {

  @field()
  user?: number;

  @field()
  salary?: number;

  orderBy?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  constructor(defs: BonusesFilter = null) {
    Object.assign(this, defs || {offset: 0, first: DEFAULT_PAGE_SIZE});
  }

}
