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

  @field({mock: ''})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<SpentTime>(SpentTime)),
    mock: ''
  })
  results: SpentTime[];

}

@model()
export class SpentTimesSummary {

  @field({mock: ''})
  spent: number;

  @field({mock: ''})
  openedSpent: number;

  @field({mock: ''})
  closedSpent: number;
}

@model()
export class TimeExpensesSummary {

  @field({mock: ''})
  count: number;

  @field({mock: ''})
  openedCount: number;

  @field({mock: ''})
  closedCount: number;

  @field({mock: ''})
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
