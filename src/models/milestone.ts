import { SearchFilter } from '@junte/ui';
import { addDays } from 'date-fns';
import { ArraySerializer } from '@junte/serialize-ts';
import { PrimitiveSerializer } from '@junte/serialize-ts';
import { MilestoneProblem, MilestoneState } from 'src/models/enums/milestone';
import { DateSerializer } from 'src/serializers/date';
import { mocks } from 'src/utils/mocks';
import { field, model } from '../decorators/model';
import { EdgesToPaging } from '../serializers/graphql';
import { ProjectSerializer } from '../serializers/project';
import { faker } from '../utils/mocks';
import { Paging } from './paging';
import { Project, ProjectGroup } from './project';

@model()
export class MilestoneMetrics {

  @field()
  customerPayroll: number;

  @field()
  payroll: number;

  @field()
  budgetSpent: number;

  @field()
  budgetRemains: number;

  @field()
  profit: number;

  @field()
  timeEstimate: number;

  @field()
  timeSpent: number;

  @field()
  timeRemains: number;

  @field({mock: () => mocks.efficiency()})
  efficiency: number;

  @field()
  issuesCount: number;

  @field()
  issuesOpenedCount: number;

  @field()
  issuesClosedCount: number;

}

@model({
  mocking: (milestone: Milestone, context: MilestonesFilter) => {
    milestone.budget = mocks.money(6000, 30000);
    const startDate = faker.date.past();
    milestone.startDate = startDate;
    milestone.dueDate = addDays(startDate, mocks.random(5, 14));

    milestone.metrics.timeEstimate = mocks.time(300, 600);
    milestone.metrics.timeSpent = mocks.time(300, 600);
    milestone.metrics.timeRemains = milestone.metrics.timeEstimate - milestone.metrics.timeSpent;
    milestone.metrics.payroll = mocks.money(3000, 15000);
    milestone.metrics.profit = milestone.budget - milestone.metrics.payroll;
    milestone.metrics.customerPayroll = mocks.money(4000, 20000);
    milestone.metrics.budgetSpent = mocks.money(5000, 25000);
    milestone.metrics.budgetRemains = milestone.budget - milestone.metrics.budgetSpent;

    milestone.metrics.issuesCount = mocks.random(70, 120);
    milestone.metrics.issuesOpenedCount = mocks.random(30, 60);
    milestone.metrics.issuesClosedCount = milestone.metrics.issuesCount - milestone.metrics.issuesOpenedCount;
    if (!!context) {
      switch (context.state) {
        case MilestoneState.active:
          milestone.state = MilestoneState.active;
          break;
        case MilestoneState.closed:
          milestone.state = MilestoneState.closed;
          break;
        default:
          milestone.state = faker.helpers.randomize([MilestoneState.active, MilestoneState.closed]);
      }
    }
  }
})
export class Milestone {

  @field({mock: context => context?.id || faker.random.uuid()})
  id: string;

  @field({
    mock: () => faker.helpers.randomize([
      $localize`:@@mocks.milestone_mvp:MVP`,
      $localize`:@@mocks.milestone_sprint:Sprint 1`,
      $localize`:@@mocks.milestone_version:Version 1.0`
    ])
  })
  title: string;

  @field({mock: () => ProjectGroup, serializer: new ProjectSerializer()})
  owner: Project | ProjectGroup;

  @field({mock: () => faker.helpers.randomize([MilestoneState.active, MilestoneState.closed])})
  state: MilestoneState;

  @field()
  budget: number;

  @field({serializer: new DateSerializer()})
  startDate: Date;

  @field({serializer: new DateSerializer()})
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

  @field({mock: mocks.random(20, 50)})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Milestone>(Milestone)),
    mock: {type: Milestone, length: 10},
  })
  results: Milestone[];
}

@model()
export class MilestonesFilter implements SearchFilter {

  @field()
  first: number;

  @field()
  offset: number;

  @field()
  q: string;

  @field()
  project: string;

  @field()
  state: MilestoneState;

  @field()
  orderBy: string;

  constructor(defs: Partial<MilestonesFilter> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@model({
  mocking: (summary: MilestonesSummary) => {
    summary.count = mocks.random(15, 25);
    summary.closedCount = mocks.random(10, 20);
    summary.activeCount = summary.count - summary.closedCount;
  }
})
export class MilestonesSummary {

  @field()
  count: number;

  @field()
  closedCount: number;

  @field()
  activeCount: number;
}
