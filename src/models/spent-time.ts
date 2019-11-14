import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { Paging } from './paging';
import { DateSerializer } from '../serializers/date';
import { DATE_FORMAT } from '../consts';
import { field, model } from '@junte/mocker-library';
import { OwnerSerializer } from '../serializers/owner';
import { MergeRequest, MergeRequestState } from './merge-request';
import { EdgesToPaging } from '../serializers/graphql';
import { Issue } from './issue';
import { DEFAULT_PAGE_SIZE } from 'src/consts';

export enum TimeExpensesState {
  opened = 'opened',
  merged = 'merged',
  closed = 'closed'
}

@model()
export class SpentTime {

  @field({mock: '{{id}}'})
  id: number;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  createdAt: Date;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  date: Date;

  @field({
    serializer: new OwnerSerializer(),
    mock: '{{> issue}}'
  })
  owner: Issue | MergeRequest;

  @field({mock: '{{int 10 100}}'})
  timeSpent: number;

  @field({mock: '{{money}}'})
  sum: number;
}

@model()
export class PagingTimeExpenses implements Paging<SpentTime> {

  @field({mock: '{{int 50 1000}}'})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<SpentTime>(SpentTime)),
    mock: '[{{#repeat 10 20}} {{> spent_time}} {{/repeat}}]'
  })
  results: SpentTime[];

}

@model()
export class SpentTimesSummary {

  @field({mock: '{{int 10 100}}'})
  spent: number;

  @field({mock: '{{int 10 100}}'})
  openedSpent: number;
}

@model()
export class TimeExpensesSummary {

  @field({mock: '{{int1 10}}'})
  count: number;

  @field({mock: '{{int1 10}}'})
  openedCount: number;

  @field({mock: '{{int1 10}}'})
  closedCount: number;

  @field({mock: '{{int1 10}}'})
  mergedCount: number;

}

@model()
export class TimeExpensesFilter {

  @field()
  team?: number;

  @field()
  user?: number;

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
  state?: TimeExpensesState | null;

  constructor(defs: TimeExpensesFilter = null) {
      Object.assign(this, defs || {offset: 0, first: DEFAULT_PAGE_SIZE});
  }

}
