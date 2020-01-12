import * as faker from 'faker';
import { helpers } from 'faker';
import { SearchFilter } from 'junte-ui';
import { ArraySerializer, ModelSerializer, PrimitiveSerializer } from 'serialize-ts';
import { IssueProblem, IssueState } from 'src/models/enums/issue';
import { Team } from 'src/models/team';
import { Ticket } from 'src/models/ticket';
import { DATE_FORMAT } from '../consts';
import { field, model } from '../decorators/model';
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

@model({
  mocking: (issue: Issue, context: IssuesFilter) => {
    issue.timeEstimate = Math.round(Math.random() * 3600 * 3 + 2);
    issue.totalTimeSpent = Math.round(Math.random() * 3600 * 2);
    issue.timeSpent = issue.totalTimeSpent;
    if (!!context) {
      if (context.state === IssueState.opened) {
        issue.state = IssueState.opened;
      } else if (context.state === IssueState.closed) {
        issue.state = IssueState.closed;
      }

      if (context.problems === true) {
        issue.problems = helpers.randomize([
          IssueProblem.emptyDueDate,
          IssueProblem.emptyEstimate,
          IssueProblem.overDueDate]);
      }
    }
  }
})
export class Issue {

  @field({mock: () => faker.random.uuid()})
  id: string;

  @field()
  user: User;

  @field({
    mock: {type: User, length: 5},
    serializer: new EdgesToArray(User)
  })
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

  @field()
  timeEstimate: number;

  @field()
  timeSpent: number;

  @field()
  totalTimeSpent: number;

  @field({mock: () => faker.internet.url()})
  glUrl: string;

  @field({mock: () => helpers.randomize([IssueState.opened, IssueState.closed])})
  state: IssueState;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  closedAt: Date;

  @field({
    mock: [],
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
  @field({mock: () => faker.random.number()})
  remains: number;

  @field({mock: () => faker.random.number({max: 100})})
  percentage: number;

  @field({mock: () => faker.random.number()})
  openedCount: number;
}

@model()
export class TeamIssuesSummary {
  @field({mock: () => faker.random.number()})
  remains: number;

  @field({mock: () => faker.random.number({max: 100})})
  percentage: number;

  @field({mock: () => faker.random.number()})
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

  @field({mock: () => faker.random.number()})
  count: number;

  @field({mock: () => faker.random.number()})
  closedCount: number;

  @field({mock: () => faker.random.number()})
  openedCount: number;

  @field({mock: () => faker.random.number()})
  timeSpent: number;

  @field({mock: () => faker.random.number()})
  problemsCount: number;

  @field({
    mock: {type: ProjectSummary, length: 5},
    serializer: new ArraySerializer(new ModelSerializer(ProjectSummary))
  })
  projects: ProjectSummary[];

  @field({
    mock: {type: TeamSummary, length: 10},
    serializer: new ArraySerializer(new ModelSerializer(TeamSummary))
  })
  teams: TeamSummary[];

}
