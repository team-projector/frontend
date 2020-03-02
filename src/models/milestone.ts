import { addDays } from 'date-fns';
import { faker } from '../utils/mocks';
import { SearchFilter } from 'junte-ui';
import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { PrimitiveSerializer } from 'serialize-ts/dist';
import { IssueState } from 'src/models/enums/issue';
import { MilestoneProblem, MilestoneState } from 'src/models/enums/milestone';
import { ProjectSummary, TeamSummary } from 'src/models/issue';
import { DateSerializer } from 'src/serializers/date';
import { mocks } from 'src/utils/mocks';
import { field, model } from '../decorators/model';
import { EdgesToPaging } from '../serializers/graphql';
import { ProjectSerializer } from '../serializers/project';
import { Paging } from './paging';
import { Project, ProjectGroup } from './project';


@model()
export class MilestoneMetrics {

  @field({mock: () => faker.random.number()})
  customerPayroll: number;

  @field({mock: () => faker.random.number()})
  payroll: number;

  @field({mock: () => faker.random.number()})
  budgetSpent: number;

  @field({mock: () => faker.random.number()})
  budgetRemains: number;

  @field({mock: () => faker.random.number()})
  profit: number;

  @field({mock: () => faker.random.number()})
  timeEstimate: number;

  @field({mock: () => faker.random.number()})
  timeSpent: number;

  @field({mock: () => faker.random.number()})
  timeRemains: number;

  @field({mock: () => faker.random.number()})
  efficiency: number;

  @field({mock: () => faker.random.number()})
  issuesCount: number;

  @field({mock: () => faker.random.number()})
  issuesOpenedCount: number;

  @field({mock: () => faker.random.number()})
  issuesClosedCount: number;

}

@model({
  mocking: (milestone: Milestone) => {
    milestone.budget = mocks.money(60000, 300000);
    const startDate = faker.date.past();
    milestone.startDate = startDate;
    milestone.dueDate = addDays(startDate, mocks.random(5, 14));

    milestone.metrics.timeEstimate = mocks.time(300, 600);
    milestone.metrics.timeSpent = mocks.time(300, 600);
    milestone.metrics.timeRemains = milestone.metrics.timeEstimate - milestone.metrics.timeSpent;
    milestone.metrics.payroll = mocks.money(30000, 150000);
    milestone.metrics.profit = milestone.budget - milestone.metrics.payroll;
    milestone.metrics.customerPayroll = mocks.money(60000, 300000);
    milestone.metrics.budgetSpent = mocks.money(30000, 150000);
    milestone.metrics.budgetRemains = milestone.budget - milestone.metrics.budgetSpent;
  }
})
export class Milestone {

  @field({mock: context => !!context && !!context.id ? context.id : faker.random.uuid()})
  id: string;

  @field({
    mock: () => faker.helpers.randomize([
      $localize`:@@mocks.milestone_mvp:MVP`,
      $localize`:@@mocks.milestone_sprint:Sprint 1`,
      $localize`:@@mocks.milestone_version:Version 1.0`
    ])
  })
  title: string;

  @field({mock: ProjectGroup, serializer: new ProjectSerializer()})
  owner: Project | ProjectGroup;

  @field({mock: () => faker.helpers.randomize([MilestoneState.opened, MilestoneState.closed])})
  state: MilestoneState;

  @field({mock: () => faker.random.number()})
  budget: number;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  startDate: Date;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  dueDate: Date;

  @field({mock: MilestoneMetrics})
  metrics: MilestoneMetrics;

  @field({mock: () => faker.internet.url()})
  glUrl: string;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: []
  })
  problems: MilestoneProblem[];
}

@model()
export class PagingMilestones implements Paging<Milestone> {

  @field({mock: faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Milestone>(Milestone)),
    mock: {type: Milestone, length: 5},
  })
  results: Milestone[];
}

@model()
export class MilestonesFilter implements SearchFilter {

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  q?: string;

  @field()
  active?: boolean;

  constructor(defs: MilestonesFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
