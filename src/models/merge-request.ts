import * as faker from 'faker';
import { helpers } from 'faker';
import { SearchFilter } from 'junte-ui';
import { ArraySerializer } from 'serialize-ts';
import { DATE_FORMAT } from 'src/consts';
import { MergeRequestState } from 'src/models/enums/merge-requests';
import { DateSerializer } from 'src/serializers/date';
import { field, model } from '../decorators/model';
import { EdgesToArray, EdgesToPaging } from '../serializers/graphql';
import { Issue } from './issue';
import { Label } from './label';
import { Paging } from './paging';
import { Project } from './project';
import { User } from './user';

@model()
export class MergeRequestSummary {

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
export class MergeRequestMetrics {

  @field({mock: () => faker.random.number()})
  remains: number;

  @field({mock: () => faker.random.number()})
  efficiency: number;

  @field({mock: () => faker.random.number()})
  payroll: number;

  @field({mock: () => faker.random.number()})
  paid: number;

}

@model()
export class MergeRequest {

  @field({mock: () => faker.random.uuid()})
  id: number;

  @field({mock: ''})
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
      'New features added',
      'Bug fixed',
      'Refactored'
    ])
  })
  title: string;

  @field({mock: {type: Label, length: 3}, serializer: new EdgesToArray(Label)})
  labels: Label[];

  @field({mock: ''})
  project: Project;

  @field({mock: ''})
  timeEstimate: number;

  @field({mock: ''})
  timeSpent: number;

  @field({mock: ''})
  totalTimeSpent: number;

  @field({mock: ''})
  glUrl: string;

  @field({mock: () => helpers.randomize([MergeRequestState.opened, MergeRequestState.closed])})
  state: MergeRequestState;

  @field({mock: ''})
  metrics: MergeRequestMetrics;
}

@model()
export class PagingMergeRequest implements Paging<MergeRequest> {

  @field({mock: () => faker.random.number()})
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
