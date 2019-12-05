import { field, model } from '@junte/mocker-library';
import { SearchFilter } from 'junte-ui';
import { ArraySerializer, ModelSerializer, PrimitiveSerializer } from 'serialize-ts';
import { IssueProblem, IssueState } from 'src/models/enums/issue';
import { Team } from 'src/models/team';
import { Ticket } from 'src/models/ticket';
import { DATE_FORMAT } from '../consts';
import { DateSerializer } from '../serializers/date';
import { EdgesToArray, EdgesToPaging } from '../serializers/graphql';
import { Label } from './label';
import { Paging } from './paging';
import { Project } from './project';
import { User } from './user';

@model()
export class IssueMetrics {

  @field()
  remains: number;

  @field()
  efficiency: number;

  @field()
  payroll: number;

  @field()
  paid: number;

}

@model()
export class Issue {

  @field()
  id: number;

  @field()
  user: User;

  @field({serializer: new EdgesToArray(User)})
  participants: User[];

  @field()
  title: string;

  @field({serializer: new EdgesToArray(Label)})
  labels: Label[];

  @field()
  project: Project;

  @field()
  ticket: Ticket;

  @field({serializer: new DateSerializer()})
  dueDate: Date;

  @field({serializer: new DateSerializer()})
  createdAt: Date;

  @field()
  timeEstimate: number;

  @field()
  timeSpent: number;

  @field()
  totalTimeSpent: number;

  @field()
  glUrl: string;

  @field({mock: IssueState.opened})
  state: IssueState;

  @field({serializer: new DateSerializer()})
  closedAt: Date;

  @field({serializer: new ArraySerializer(new PrimitiveSerializer())})
  problems: IssueProblem[];

  @field()
  metrics: IssueMetrics;
}

@model()
export class PagingIssues implements Paging<Issue> {

  @field()
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Issue>(Issue))
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
