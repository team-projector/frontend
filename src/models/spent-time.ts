import { LazyModel } from '../serializers/model';
import { faker } from '../utils/mocks';
import { ArraySerializer } from '@junte/serialize-ts';
import { TimeExpenseState } from 'src/models/enums/time-expenses';
import { mocks} from 'src/utils/mocks';
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
import { User } from './user';

@model()
export class SpentTime {

  @field({mock: () => mocks.id()})
  id: string;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  createdAt: Date;

  @field({
    serializer: new DateSerializer(),
    mock: faker.date.past()
  })
  date: Date;

  @field({mock: User})
  user: User;

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

  @field({mock: () => mocks.random(15, 40)})
  count: number;

  @field({
    name: 'edges',
    mock: {type: SpentTime, length: 10},
    serializer: new ArraySerializer(new EdgesToPaging<SpentTime>(SpentTime))
  })
  results: SpentTime[];

}

@model({
  mocking: (summary: SpentTimesSummary) => {
    summary.spent = mocks.time(55, 80);
    summary.openedSpent = mocks.time(8, 15);
    summary.closedSpent = summary.spent - summary.openedSpent;
  }
})
export class SpentTimesSummary {

  @field()
  spent: number;

  @field()
  openedSpent: number;

  @field()
  closedSpent: number;
}

@model({
  mocking: (summary: TimeExpensesSummary) => {
    summary.count = mocks.random(15, 25);
    summary.closedCount = mocks.random(10, 20);
    summary.openedCount = summary.count - summary.closedCount;
  }
})
export class TimeExpensesSummary {

  @field({mock: () => mocks.random(1, 10)})
  count: number;

  @field({mock: () => mocks.random(1, 10)})
  openedCount: number;

  @field({mock: () => mocks.random(1, 10)})
  closedCount: number;

  @field({mock: () => mocks.random(1, 10)})
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
