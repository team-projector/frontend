import { SearchFilter, UI } from '@junte/ui';
import { addDays } from 'date-fns';
import { ArraySerializer, PrimitiveSerializer } from 'serialize-ts';
import { ModelMetadataSerializer } from 'serialize-ts/dist/serializers/model-metadata.serializer';
import { IssueProblem, IssueState } from 'src/models/enums/issue';
import { StandardLabel } from 'src/models/enums/standard-label';
import { Team } from 'src/models/team';
import { Ticket } from 'src/models/ticket';
import { mocks, TimeAccuracy } from 'src/utils/mocks';
import { DATE_FORMAT } from '../consts';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { EdgesToArray, EdgesToPaging } from '../serializers/graphql';
import { faker } from '../utils/mocks';
import { Label } from './label';
import { Paging } from './paging';
import { Project } from './project';
import { User } from './user';

@model()
export class IssueMetrics {

  @field({mock: () => mocks.time()})
  remains: number;

  @field({mock: () => mocks.efficiency()})
  efficiency: number;

  @field({mock: () => mocks.money(10, 100)})
  payroll: number;

  @field({mock: () => mocks.money(10, 100)})
  paid: number;

}

@model({
  mocking: (issue: Issue, context: IssuesFilter) => {
    const recent = faker.date.recent();
    issue.dueDate = addDays(recent, mocks.random(1, 20));
    issue.timeEstimate = mocks.time(1, 10, TimeAccuracy.minutes);
    issue.totalTimeSpent = mocks.time(1, 15, TimeAccuracy.minutes);
    issue.timeSpent = issue.totalTimeSpent;

    switch (mocks.random(1, 4)) {
      case 1: // issue for to do
        issue.labels.push(new Label({
          title: StandardLabel.toDo,
          color: UI.color.green
        }));
        issue.state = IssueState.opened;
        break;
      case 2: // issue for to doing
        issue.labels.push(new Label({
          title: StandardLabel.doing,
          color: UI.color.green
        }));
        issue.state = IssueState.opened;
        break;
      case 3: // issue for to done
        issue.labels.push(new Label({
          title: StandardLabel.done,
          color: UI.color.green
        }));
        issue.state = IssueState.closed;
        break;
      default: // issue for to delayed
        issue.labels.push(new Label({
          title: StandardLabel.delayed,
          color: UI.color.green
        }));
        issue.state = IssueState.opened;
    }

    if (!!context) {
      if (context.state === IssueState.opened) {
        issue.state = IssueState.opened;
      } else if (context.state === IssueState.closed) {
        issue.state = IssueState.closed;
      }
      if (context.problems === true) {
        issue.problems = faker.helpers.randomize([
          IssueProblem.emptyDueDate,
          IssueProblem.emptyEstimate,
          IssueProblem.overDueDate]);
      }
    }

    if (issue.problems.includes(IssueProblem.emptyDueDate)) {
      issue.dueDate = null;
    } else if (issue.problems.includes(IssueProblem.emptyEstimate)) {
      issue.timeEstimate = null;
    } else if (issue.problems.includes(IssueProblem.overDueDate)) {
      issue.dueDate = faker.date.past();
    }

    issue.labels.push(faker.helpers.randomize([
      new Label({
        title: 'Discuss',
        color: UI.color.blue
      }),
      new Label({
        title: 'Urgent',
        color: UI.color.red
      }),
      new Label({
        title: 'Refactor',
        color: UI.color.green
      })
    ]));
  }
})
export class Issue {

  @field({mock: () => faker.random.uuid()})
  id: string;

  @field({mock: User})
  user: User;

  @field({
    mock: {type: User, length: 5},
    serializer: new EdgesToArray(User)
  })
  participants: User[];

  @field({
    mock: () => faker.helpers.randomize([
      $localize`:@@mocks.issue_title_implement:Implement design for login feature`,
      $localize`:@@mocks.issue_title_graphql:GraphQL API for login`,
      $localize`:@@mocks.issue_title_fix:Fix bugs in login form`
    ])
  })
  title: string;

  @field({mock: {type: Label, length: 3}, serializer: new EdgesToArray(Label)})
  labels: Label[];

  @field({mock: Project})
  project: Project;

  @field({mock: Ticket})
  ticket: Ticket;

  @field({mock: () => faker.date.future(), serializer: new DateSerializer()})
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

  @field({mock: () => faker.helpers.randomize([IssueState.opened, IssueState.closed])})
  state: IssueState;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  closedAt: Date;

  @field({
    mock: [],
    serializer: new ArraySerializer(new PrimitiveSerializer())
  })
  problems: IssueProblem[];

  @field({mock: IssueMetrics})
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
  team: string;

  @field()
  user: string;

  @field()
  project: string;

  @field()
  ticket: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  dueDate: Date;

  @field()
  state: IssueState | null;

  @field()
  problems: boolean | null;

  @field()
  first: number;

  @field()
  offset: number;

  @field()
  q: string;

  @field()
  orderBy: string;

  constructor(defs: Partial<IssuesFilter> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@model()
export class ProjectIssuesSummary {

  @field({mock: () => faker.random.number()})
  remains: number;

  @field({mock: () => mocks.percents()})
  percentage: number;

  @field({mock: () => faker.random.number()})
  openedCount: number;
}

@model()
export class ProjectSummary {

  @field({mock: Project})
  project: Project;

  @field({mock: ProjectIssuesSummary})
  issues: ProjectIssuesSummary;

}

@model()
export class TeamIssuesSummary {
  @field({mock: () => faker.random.number()})
  remains: number;

  @field({mock: () => mocks.percents()})
  percentage: number;

  @field({mock: () => faker.random.number()})
  openedCount: number;
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

  @field({mock: () => mocks.random(100, 190)})
  count: number;

  @field({mock: () => mocks.random(55, 130)})
  closedCount: number;

  @field({mock: () => mocks.random(14, 30)})
  openedCount: number;

  @field({mock: () => mocks.time(400, 700)})
  timeSpent: number;

  @field({mock: () => mocks.random(2, 9)})
  problemsCount: number;

  @field({
    mock: {type: ProjectSummary, length: 5},
    serializer: new ArraySerializer(new ModelMetadataSerializer(ProjectSummary))
  })
  projects: ProjectSummary[];

  @field({
    mock: {type: TeamSummary, length: 10},
    serializer: new ArraySerializer(new ModelMetadataSerializer(TeamSummary))
  })
  teams: TeamSummary[];
}
