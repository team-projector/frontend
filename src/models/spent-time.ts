import { LazyModel } from '../serializers/model';
import { faker } from '../utils/mocks';
import { ArraySerializer } from 'serialize-ts';
import { DEFAULT_PAGE_SIZE } from 'src/consts';
import { TimeExpenseState } from 'src/models/enums/time-expenses';
import { mocks, SECONDS_IN_HOUR } from 'src/utils/mocks';
import { DATE_FORMAT } from '../consts';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { OwnerSerializer } from '../serializers/owner';
import { ModelRef } from '../utils/types';
import { Issue } from './issue';
import { MergeRequest } from './merge-request';
import { Paging } from './paging';
import { Salary } from './salary';

@model()
export class SpentTime {

  @field({mock: () => faker.random.uuid()})
  id: string;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  createdAt: Date;

  @field({
    serializer: new DateSerializer(),
    mock: faker.date.past()
  })
  date: Date;

  @field({
    serializer: new OwnerSerializer(),
    mock: Issue
  })
  owner: Issue | MergeRequest;

  @field({mock: () => mocks.time()})
  timeSpent: number;

  @field({mock: () => mocks.money(10, 100)})
  sum: number;

  @field({serializer: new LazyModel(() => Salary)})
  salary: ModelRef<Salary>;
}

@model()
export class PagingTimeExpenses implements Paging<SpentTime> {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    mock: {type: SpentTime, length: 10},
    serializer: new ArraySerializer(new EdgesToPaging<SpentTime>(SpentTime))
  })
  results: SpentTime[];

}

@model()
export class SpentTimesSummary {

  @field({mock: () => mocks.time()})
  spent: number;

  @field({mock: () => mocks.time()})
  openedSpent: number;

  @field({mock: () => mocks.time()})
  closedSpent: number;
}

@model()
export class TimeExpensesSummary {

  @field({mock: () => faker.random.number({min: 1, max: 10})})
  count: number;

  @field({mock: () => faker.random.number({min: 1, max: 10})})
  openedCount: number;

  @field({mock: () => faker.random.number({min: 1, max: 10})})
  closedCount: number;

  @field({mock: () => faker.random.number({min: 1, max: 10})})
  mergedCount: number;

}

@model()
export class TimeExpensesFilter {

  @field()
  team: string;

  @field()
  user: string;

  @field()
  project: string;

  @field()
  salary: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  date: Date;

  orderBy: string;

  @field()
  first: number;

  @field()
  offset: number;

  @field()
  state: TimeExpenseState | null;

  constructor(defs: Partial<TimeExpensesFilter> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
