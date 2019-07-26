import {DateSerializer} from '../serializers/date';
import {SearchFilter} from 'junte-ui';
import {ArraySerializer, PrimitiveSerializer} from 'serialize-ts';
import {EdgesToArray, EdgesToPaging} from '../serializers/graphql';
import {Paging} from './paging';
import {field, model} from '@junte/mocker-library';
import {User} from './user';
import {Project} from './project';
import {Label} from './label';
import {DATE_FORMAT} from '../consts';

export enum IssueState {
  opened = 'opened',
  closed = 'closed'
}

export enum IssueProblem {
  overDueDate = 'over_due_date',
  emptyDueDate = 'empty_due_date',
  emptyEstimate = 'empty_estimate'
}

@model()
export class IssueMetrics {

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
export class Issue {

  @field({mock: '{{id}}'})
  id: number;

  @field({mock: '{{issue}}'})
  title: string;

  @field({
    serializer: new EdgesToArray(Label),
    mock: '[{{#repeat 2 5}} {{> label}} {{/repeat}}]'
  })
  labels: Label[];

  @field({mock: '{{> project}}'})
  project: Project;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  dueDate: Date;

  @field({mock: '{{int 10 100}}'})
  timeEstimate: number;

  @field({mock: '{{int 10 100}}'})
  timeSpent: number;

  @field({mock: '{{int 10 100}}'})
  totalTimeSpent: number;

  @field({mock: '{{url}}'})
  glUrl: string;

  @field({mock: IssueState.opened})
  state: IssueState;

  @field({mock: '{{> issue_metrics}}'})
  metrics: IssueMetrics;

  @field({
    serializer: new EdgesToArray(User),
    mock: '[{{#repeat 1 3}} {{> user}} {{/repeat}}]'
  })
  participants: User[];

  @field({mock: '{{> user}}'})
  user: User;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: '{{issue_problem}}'
  })
  problems: IssueProblem[];
}

@model()
export class PagingIssues implements Paging<Issue> {

  @field({mock: '{{int 50 1000}}'})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Issue>(Issue)),
    mock: '[{{#repeat 10 20}} {{> issue}} {{/repeat}}]'
  })
  results: Issue[];

}

@model()
export class IssuesFilter implements SearchFilter {

  @field()
  team?: string;

  @field()
  user?: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  dueDate?: Date;

  @field()
  state?: IssueState | null;

  @field()
  problems?: boolean | null;

  @field()
  title?: string;

  sort?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  constructor(defs: IssuesFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@model()
export class IssuesSummary {

  @field({mock: '{{int 10 100}}'})
  issuesCount: number;

  @field({mock: '{{int 10 100}}'})
  timeSpent: number;


  @field({mock: '{{int 10 100}}'})
  problemsCount: number;

}
