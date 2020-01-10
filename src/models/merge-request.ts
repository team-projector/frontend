import { field, model } from '../decorators/model';
import { SearchFilter } from 'junte-ui';
import { ArraySerializer } from 'serialize-ts';
import { DATE_FORMAT } from 'src/consts';
import { DateSerializer } from 'src/serializers/date';
import { EdgesToArray, EdgesToPaging } from '../serializers/graphql';
import { Issue } from './issue';
import { Label } from './label';
import { Paging } from './paging';
import { Project } from './project';
import { User } from './user';

export enum MergeRequestState {
  opened = 'OPENED',
  merged = 'MERGED',
  closed = 'CLOSED'
}

@model()
export class MergeRequestSummary {

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
export class MergeRequestMetrics {

  @field({mock: ''})
  remains: number;

  @field({mock: ''})
  efficiency: number;

  @field({mock: ''})
  payroll: number;

  @field({mock: ''})
  paid: number;

}

@model()
export class MergeRequest {

  @field({mock: ''})
  id: number;

  @field({mock: ''})
  user: User;

  @field({mock: ''})
  issue: Issue;

  @field({
    serializer: new EdgesToArray(User),
    mock: ''
  })
  participants: User[];

  @field({mock: ''})
  title: string;

  @field({
    serializer: new EdgesToArray(Label),
    mock: ''
  })
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

  @field({mock: MergeRequestState.opened})
  state: MergeRequestState;

  @field({mock: ''})
  metrics: MergeRequestMetrics;
}

@model()
export class PagingMergeRequest implements Paging<MergeRequest> {

  @field({mock: ''})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<MergeRequest>(MergeRequest)),
    mock: ''
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
