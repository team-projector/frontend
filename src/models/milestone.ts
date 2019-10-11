import { field, model } from '@junte/mocker-library';
import { SearchFilter } from 'junte-ui';
import { ArraySerializer } from 'serialize-ts';
import { PrimitiveSerializer } from 'serialize-ts/dist';
import { DATE_FORMAT } from 'src/consts';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { ProjectSerializer } from '../serializers/project';
import { Paging } from './paging';
import { Project, ProjectGroup } from './project';

export enum MilestoneProblem {
  overDueDate = 'over_due_date'
}

@model()
export class MilestoneMetrics {

  @field({mock: '{{money}}'})
  customerPayroll: number;

  @field({mock: '{{money}}'})
  payroll: number;

  @field({mock: '{{money}}'})
  budgetSpent: number;

  @field({mock: '{{money}}'})
  budgetRemains: number;

  @field({mock: '{{money}}'})
  profit: number;

  @field({mock: '{{int 10 100}}'})
  timeEstimate: number;

  @field({mock: '{{int 10 100}}'})
  timeSpent: number;

  @field({mock: '{{int 10 100}}'})
  timeRemains: number;

  @field({mock: '{{efficiency}}'})
  efficiency: number;

  @field({mock: '{{int 10 100}}'})
  issuesCount: number;

  @field({mock: '{{int 10 100}}'})
  issuesOpenedCount: number;

  @field({mock: '{{int 10 100}}'})
  issuesClosedCount: number;

}

@model()
export class Milestone {

  @field({mock: '{{id}}'})
  id: number;

  @field({mock: '{{title}}'})
  title: string;

  @field({
    serializer: new ProjectSerializer(),
    mock: '{{> project}}'
  })
  owner: Project | ProjectGroup;

  @field({mock: '{{money}}'})
  budget: number;

  @field({mock: '{{date \'2019\' \'2020\'}}'})
  startDate: Date;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  dueDate: Date;

  @field({mock: '{{> milestone_metrics}}'})
  metrics: MilestoneMetrics;

  @field({mock: '{{url}}'})
  glUrl: string;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: '{{milestone_problem}}'
  })
  problems: MilestoneProblem[];
}

@model()
export class PagingMilestones implements Paging<Milestone> {

  @field({mock: '{{int 3 10}}'})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Milestone>(Milestone)),
    mock: '[{{#repeat 3 10}} {{> milestone}} {{/repeat}}]'
  })
  results: Milestone[];
}

@model()
export class MilestonesFilter implements SearchFilter {

  @field()
  active?: boolean;

  @field()
  first?: number;

  @field()
  offset?: number;

  constructor(defs: MilestonesFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

export enum MilestoneTicketTypes {
  feature = 'feature',
  improvement = 'improvement',
  bugFixing = 'bug_fixing'
}

@model()
export class MilestoneTicket {

  @field()
  id: number;

  @field()
  type: MilestoneTicketTypes;

  @field()
  title: string;

  @field()
  startDate: Date;

  @field()
  dueDate: Date;

  @field()
  url: string;

  @field({mock: '{{> milestone_metrics}}'})
  metrics: MilestoneMetrics;
}

@model()
export class MilestoneTicketUpdate {

  @field()
  id: number;

  @field()
  milestone: number;

  @field()
  type: MilestoneTicketTypes;

  @field()
  title: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  startDate: Date;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  dueDate: Date;

  @field()
  url: string;

  constructor(update: MilestoneTicketUpdate) {
    Object.assign(this, update);
  }
}

@model()
export class PagingMilestoneTickets implements Paging<MilestoneTicket> {

  @field({mock: '{{int 3 10}}'})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<MilestoneTicket>(MilestoneTicket)),
    mock: '[{{#repeat 3 10}} {{> milestone_ticket}} {{/repeat}}]'
  })
  results: MilestoneTicket[];
}

@model()
export class MilestoneTicketsFilter implements SearchFilter {

  @field()
  milestone: number;

  @field()
  orderBy?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  constructor(defs: MilestoneTicketsFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
