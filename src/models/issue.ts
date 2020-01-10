import { field, model } from '../decorators/model';
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
import * as faker from 'faker';
import { helpers } from 'faker';

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
  id: string;

  @field()
  user: User;

  @field({mock: {type: User, length: 5}, serializer: new EdgesToArray(User)})
  participants: User[];

  @field({
    mock: () => helpers.randomize([
      'Implement design for login feature',
      'GraphQL API for login',
      'Fix bugs in login form'
    ])
  })
  title: string;

  @field({mock: {type: Label, length: 3}, serializer: new EdgesToArray(Label)})
  labels: Label[];

  @field()
  project: Project;

  @field()
  ticket: Ticket;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  dueDate: Date;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  createdAt: Date;

  @field({mock: () => faker.random.number()})
  timeEstimate: number;

  @field({mock: () => faker.random.number()})
  timeSpent: number;

  @field({mock: () => faker.random.number()})
  totalTimeSpent: number;

  @field({mock: () => faker.internet.url()})
  glUrl: string;

  @field({mock: () => helpers.randomize([IssueState.opened, IssueState.closed])})
  state: IssueState;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  closedAt: Date;

  @field({
    mock: () => helpers.randomize([
      IssueProblem.emptyDueDate,
      IssueProblem.emptyEstimate,
      IssueProblem.overDueDate]),
    serializer: new ArraySerializer(new PrimitiveSerializer())
  })
  problems: IssueProblem[];

  @field()
  metrics: IssueMetrics;
}

@model()
export class PagingIssues implements Paging<Issue> {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    mock: {type: Issue, length: 10},
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
  orderBy?: string;

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

  @field({mock: ''})
  count: number;

  @field({mock: ''})
  closedCount: number;

  @field({mock: ''})
  openedCount: number;

  @field({mock: ''})
  timeSpent: number;

  @field({mock: ''})
  problemsCount: number;

  @field({serializer: new ArraySerializer(new ModelSerializer(ProjectSummary))})
  projects: ProjectSummary[];

  @field({serializer: new ArraySerializer(new ModelSerializer(TeamSummary))})
  teams: TeamSummary[];

}
