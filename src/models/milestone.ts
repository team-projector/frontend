import * as faker from 'faker';
import { helpers } from 'faker';
import { SearchFilter } from 'junte-ui';
import { ArraySerializer } from 'serialize-ts';
import { PrimitiveSerializer } from 'serialize-ts/dist';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { ProjectSerializer } from '../serializers/project';
import { ProjectSummary } from './issue';
import { Paging } from './paging';
import { Project, ProjectGroup } from './project';

export enum MilestoneProblem {
  overDueDate = 'OVER_DUE_DATE'
}

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

@model()
export class Milestone {

  @field({mock: context => !!context && !!context.id ? context.id : faker.random.uuid()})
  id: string;

  @field({
    mock: () => helpers.randomize([
      'MVP',
      'Sprint 1',
      'Version 1.0'
    ])
  })
  title: string;

  @field({mock: ProjectGroup, serializer: new ProjectSerializer()})
  owner: Project | ProjectGroup;

  @field({mock: () => faker.random.number()})
  budget: number;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  startDate: Date;

  @field({mock: () => faker.date.future(), serializer: new DateSerializer()})
  dueDate: Date;

  @field()
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

  @field({mock: ''})
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

  constructor(defs: MilestonesFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
