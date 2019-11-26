import { field, model } from '@junte/mocker-library';
import { SearchFilter } from 'junte-ui';
import { ArraySerializer, ModelSerializer, PrimitiveSerializer } from 'serialize-ts';
import { Team } from 'src/models/team';
import { Ticket } from 'src/models/ticket';
import { DATE_FORMAT } from '../consts';
import { DateSerializer } from '../serializers/date';
import { EdgesToArray, EdgesToPaging } from '../serializers/graphql';
import { Label } from './label';
import { Paging } from './paging';
import { Project } from './project';
import { User } from './user';

export enum IssueState {
  opened = 'opened',
  closed = 'closed'
}

export enum IssueProblem {
  overDueDate = 'over_due_date',
  emptyDueDate = 'empty_due_date',
  emptyEstimate = 'empty_estimate'
}

export enum IssuesType {
  all = 'all',
  closed = 'closed',
  opened = 'opened',
  problems = 'problems'
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

  @field({mock: '{{> project}}'})
  project: Project;

  @field({mock: '{{> ticket}}'})
  ticket: Ticket;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  dueDate: Date;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  closedAt: Date;

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

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: '{{issue_problem}}'
  })
  problems: IssueProblem[];

  @field({mock: '{{> issue_metrics}}'})
  metrics: IssueMetrics;
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

  @field()
  project?: string;

  @field()
  milestone?: string;

  @field()
  ticket?: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  dueDate?: Date;

  @field()
  state?: IssueState | null;

  @field()
  problems?: boolean | null;

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  q?: string;

  @field()
  sort?: string;

  constructor(defs: IssuesFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@model()
export class ProjectIssuesSummary {
  @field()
  remains: number;

  @field()
  percentage: number;

  @field()
  openedCount: number;
}

@model()
export class TeamIssuesSummary {
  @field()
  remains: number;

  @field()
  percentage: number;

  @field()
  openedCount: number;
}

@model()
export class ProjectSummary {

  @field()
  project: Project;

  @field()
  issues: ProjectIssuesSummary;

}

@model()
export class TeamSummary {

  @field()
  team: Team;

  @field()
  issues: TeamIssuesSummary;

}

@model()
export class IssuesSummary {

  @field({mock: '{{int 10 100}}'})
  count: number;

  @field({mock: '{{int 10 100}}'})
  closedCount: number;

  @field({mock: '{{int 10 100}}'})
  openedCount: number;

  @field({mock: '{{int 10 100}}'})
  timeSpent: number;

  @field({mock: '{{int 10 100}}'})
  problemsCount: number;

  @field({serializer: new ArraySerializer(new ModelSerializer(ProjectSummary))})
  projects: ProjectSummary[];

  @field({serializer: new ArraySerializer(new ModelSerializer(TeamSummary))})
  teams: TeamSummary[];

}
