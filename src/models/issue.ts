import {ArraySerializer, ModelSerializer, PrimitiveSerializer} from 'serialize-ts';
import {DateSerializer} from '../serializers/date';
import {DATE_FORMAT} from '../consts';
import {Order, SearchFilter} from 'junte-ui';
import {User} from './user';
import {Project} from './project';
import {Milestone} from './milestone';
import {field, model} from '@junte/mocker-library';
import {Label} from './label';

export enum IssueState {
  opened = 'opened',
  closed = 'closed'
}

export enum IssueProblem {
  overDueDate = 'over_due_date',
  emptyDueDate = 'empty_due_date',
  emptyEstimate = 'empty_estimate'
}

export enum ErrorType {
  issueWithoutDueDate = 'issue_without_due_date',
  issueWithoutEstimate = 'issue_without_estimate'
}

@model()
export class IssueMetrics {

  @field({mock: '{{int 10 100}}'})
  remains: number;

  @field({mock: '{{efficiency}}'})
  efficiency: number;

  @field({mock: '{{money}}'})
  paid: number;

  @field({mock: '{{money}}'})
  payroll: number;

}

@model()
export class Issue {

  @field({mock: '{{int 1 1000}}'})
  id: number;

  @field({mock: '{{issue}}'})
  title: string;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(Label)),
    mock: '[{{#repeat 2 5}} {{> label}} {{/repeat}}]'
  })
  labels: Label[];

  @field({mock: '{{> project}}'})
  project: Project;

  @field({
    name: 'due_date',
    serializer: new DateSerializer(DATE_FORMAT),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  dueDate: Date;

  @field({
    name: 'time_estimate',
    mock: '{{int 10 100}}'
  })
  timeEstimate: number;

  @field({
    name: 'time_spent',
    mock: '{{int 10 100}}'
  })
  timeSpent: number;

  @field({
    name: 'total_time_spent',
    mock: '{{int 10 100}}'
  })
  totalTimeSpent: number;

  @field({
    name: 'gl_url',
    mock: '{{url}}'
  })
  glUrl: string;

  @field({mock: IssueState.opened})
  state: IssueState;

  @field({mock: '{{> issue_metrics}}'})
  metrics: IssueMetrics;

  @field({mock: '{{> object_link presentation=(milestone)}}'})
  milestone: Milestone;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(User)),
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
export class IssuesFilter implements SearchFilter {

  @field()
  user?: number;

  @field()
  team?: number;

  @field({name: 'q'})
  query?: string;

  @field({
    name: 'due_date',
    serializer: new DateSerializer(DATE_FORMAT)
  })
  dueDate?: Date;

  @field()
  state?: IssueState | null;

  @field()
  problems?: boolean | null;

  @field()
  sort?: string;

  @field()
  orderBy?: Order = Order.asc;

  @field()
  page?: number;

  @field({name: 'page_size'})
  pageSize?: number;

  constructor(defs: IssuesFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@model()
export class IssuesSummary {

  @field({
    name: 'issues_count',
    mock: '{{int 10 100}}'
  })
  issuesCount: number;

  @field({
    name: 'time_spent',
    mock: '{{int 10 100}}'
  })
  timeSpent: number;


  @field({
    name: 'problems_count',
    mock: '{{int 10 100}}'
  })
  problemsCount: number;

}
