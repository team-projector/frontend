import {ArraySerializer, ModelSerializer} from 'serialize-ts';
import {field, model} from '@junte/mocker-library';
import {Label} from './label';
import {User} from './user';
import {Project} from './project';
import {EdgesToArray, EdgesToPaging} from '../serializers/graphql';
import {Paging} from './paging';
import {Issue, IssueMetrics, IssueState} from './issue';
import {SearchFilter} from 'junte-ui';
import {DateSerializer} from '../serializers/date';
import {DATE_FORMAT} from '../consts';

export enum MergeRequestState {
  opened = 'opened',
  merged = 'merged',
  closed = 'closed'
}

@model()
export class MergeRequestMetrics {

  @field({mock: '{{int 10 100}}'})
  remains: number;

  @field({mock: '{{efficiency}}'})
  efficiency: number;

  @field({mock: '{{money}}'})
  payroll: number;

  @field({mock: '{{money}}'})
  paid: number;

}

@model()
export class MergeRequest {

  @field({mock: '{{id}}'})
  id: number;

  @field({mock: '{{> user}}'})
  user: User;

  @field({
    serializer: new EdgesToArray(User),
    mock: '[{{#repeat 1 3}} {{> user}} {{/repeat}}]'
  })
  participants: User[];

  @field({mock: '{{issue}}'})
  title: string;

  @field({
    serializer: new EdgesToArray(Label),
    mock: '[{{#repeat 2 5}} {{> label}} {{/repeat}}]'
  })
  labels: Label[];

  @field({mock: '{{> object_link presentation=(project)}}'})
  project: Project;

  @field({mock: '{{int 10 100}}'})
  timeEstimate: number;

  @field({mock: '{{int 10 100}}'})
  timeSpent: number;

  @field({mock: '{{int 10 100}}'})
  totalTimeSpent: number;

  @field({mock: '{{url}}'})
  glUrl: string;

  @field({mock: MergeRequestState.opened})
  state: MergeRequestState;

  @field({mock: '{{> issue_metrics}}'})
  metrics: MergeRequestMetrics;
}

@model()
export class PagingMergeRequest implements Paging<MergeRequest> {

  @field({mock: '{{int 50 1000}}'})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<MergeRequest>(MergeRequest)),
    mock: '[{{#repeat 10 20}} {{> merge_request}} {{/repeat}}]'
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
