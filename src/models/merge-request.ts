import { faker } from '../utils/mocks';
import { helpers } from 'faker';
import { SearchFilter } from '@junte/ui';
import { ArraySerializer } from 'serialize-ts';
import { DATE_FORMAT } from 'src/consts';
import { MergeRequestState } from 'src/models/enums/merge-requests';
import { DateSerializer } from 'src/serializers/date';
import { field, model } from '../decorators/model';
import { EdgesToArray, EdgesToPaging } from '../serializers/graphql';
import { mocks } from '../utils/mocks';
import { Issue } from './issue';
import { Label } from './label';
import { Paging } from './paging';
import { Project } from './project';
import { User } from './user';

@model({
  mocking: (summary: MergeRequestSummary) => {
    summary.count = mocks.random(75, 125);
    summary.closedCount = mocks.random(10, 20);
    summary.openedCount = mocks.random(10, 20);
    summary.mergedCount = summary.count - summary.closedCount - summary.openedCount;
  }
})
export class MergeRequestSummary {

  @field()
  count: number;

  @field()
  closedCount: number;

  @field()
  openedCount: number;

  @field()
  mergedCount: number;

}

@model()
export class MergeRequestMetrics {

  @field({mock: () => mocks.time()})
  remains: number;

  @field({mock: () => mocks.efficiency()})
  efficiency: number;

  @field({mock: () => mocks.money(10, 100)})
  payroll: number;

  @field({mock: () => mocks.money(10, 100)})
  paid: number;

}

@model()
export class MergeRequest {

  @field({mock: () => faker.random.uuid()})
  id: number;

  @field({mock: User})
  user: User;

  @field({mock: {type: Issue, length: 1}, serializer: new EdgesToArray(Issue)})
  issues: Issue[];

  @field({
    serializer: new EdgesToArray(User),
    mock: {type: User, length: 5}
  })
  participants: User[];

  @field({
    mock: () => helpers.randomize([
      $localize`:@@mocks.merge_title_features:New features added`,
      $localize`:@@mocks.merge_title_bug:Bug fixed`,
      $localize`:@@mocks.merge_title_refactored:Refactored`
    ])
  })
  title: string;

  @field({mock: {type: Label, length: 1}, serializer: new EdgesToArray(Label)})
  labels: Label[];

  @field({mock: Project})
  project: Project;

  @field({mock: () => mocks.time()})
  timeEstimate: number;

  @field({mock: () => mocks.time()})
  timeSpent: number;

  @field({mock: () => mocks.time()})
  totalTimeSpent: number;

  @field({mock: () => faker.internet.url()})
  glUrl: string;

  @field({mock: () => helpers.randomize([MergeRequestState.opened, MergeRequestState.closed])})
  state: MergeRequestState;

  @field({mock: MergeRequestMetrics})
  metrics: MergeRequestMetrics;
}

@model()
export class PagingMergeRequest implements Paging<MergeRequest> {

  @field({mock: () => mocks.random(15, 40)})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<MergeRequest>(MergeRequest)),
    mock: {type: MergeRequest, length: 10}
  })
  results: MergeRequest[];

}

@model()
export class MergeRequestsFilter implements SearchFilter {

  @field()
  team?: string;

  @field()
  user?: string;

  @field()
  project?: string;

  @field()
  state?: MergeRequestState | null;

  @field()
  orderBy?: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  dueDate?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  q?: string;

  constructor(defs: MergeRequestsFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
