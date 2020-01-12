import { field, model } from '../decorators/model';
import { ArraySerializer } from 'serialize-ts';
import { DEFAULT_PAGE_SIZE } from 'src/consts';
import { DATE_FORMAT } from '../consts';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { OwnerSerializer } from '../serializers/owner';
import { Issue } from './issue';
import { MergeRequest } from './merge-request';
import { Paging } from './paging';
import * as faker from 'faker';

export enum TimeExpenseState {
  opened = 'OPENED',
  closed = 'CLOSED',
  all = 'ALL'
}

@model()
export class SpentTime {

  @field({mock: ''})
  id: number;

  @field({
    serializer: new DateSerializer(),
    mock: ''
  })
  createdAt: Date;

  @field({
    serializer: new DateSerializer(),
    mock: ''
  })
  date: Date;

  @field({
    serializer: new OwnerSerializer(),
    mock: ''
  })
  owner: Issue | MergeRequest;

  @field({mock: ''})
  timeSpent: number;

  @field({mock: ''})
  sum: number;
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

  @field({mock: () => faker.random.number()})
  spent: number;

  @field({mock: () => faker.random.number()})
  openedSpent: number;

  @field({mock: () => faker.random.number()})
  closedSpent: number;
}

@model()
export class TimeExpensesSummary {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({mock: () => faker.random.number()})
  openedCount: number;

  @field({mock: () => faker.random.number()})
  closedCount: number;

  @field({mock: () => faker.random.number()})
  mergedCount: number;

}

@model()
export class TimeExpensesFilter {

  @field()
  team?: number;

  @field()
  user?: number;

  @field()
  project?: number;

  @field()
  salary?: number;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  date?: Date;

  orderBy?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  state?: TimeExpenseState | null;

  constructor(defs: TimeExpensesFilter = null) {
    Object.assign(this, defs || {offset: 0, first: DEFAULT_PAGE_SIZE});
  }

}
