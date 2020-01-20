import { SearchFilter } from 'junte-ui';
import { ArraySerializer } from 'serialize-ts';
import { DEFAULT_PAGE_SIZE } from 'src/consts';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { Paging } from './paging';
import * as faker from 'faker';
import { helpers } from 'faker';

@model()
export class Salary {

  @field({mock: () => faker.random.number()})
  id: number;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  createdAt: Date;

  @field({mock: () => faker.date.future(), serializer: new DateSerializer()})
  periodTo: Date;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  periodFrom: Date;

  @field({mock: () => faker.random.number()})
  chargedTime: number;

  @field({mock: () => faker.random.number()})
  bonus: number;

  @field({mock: () => faker.random.number()})
  taxes: number;

  @field({mock: () => faker.random.number()})
  penalty: number;

  @field({mock: () => faker.random.number()})
  sum: number;

  @field({mock: () => faker.random.number()})
  total: number;

  @field({mock: () => helpers.randomize([true, false])})
  payed: boolean;

}

@model()
export class PagingSalaries implements Paging<Salary> {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Salary>(Salary)),
    mock: {type: Salary, length: 10}
  })
  results: Salary[];

}

@model()
export class SalariesFilter implements SearchFilter {

  @field()
  user?: number;

  @field()
  first?: number;

  @field()
  offset?: number;

  constructor(defs: SalariesFilter = null) {
    Object.assign(this, defs || {offset: 0, first: DEFAULT_PAGE_SIZE});
  }

}
