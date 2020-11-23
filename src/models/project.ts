import { SearchFilter } from '@junte/ui';
import { ArraySerializer } from '@junte/serialize-ts';
import { field, model } from '../decorators/model';
import { EdgesToArray, EdgesToPaging } from '../serializers/graphql';
import { faker, mocks } from '../utils/mocks';
import { ModelRef } from '../utils/types';
import { ProjectState } from './enums/project';
import { Milestone } from './milestone';
import { Paging } from './paging';

@model()
export class ProjectsSummary {

  @field({mock: mocks.random(10, 20)})
  count: number;

  @field({mock: mocks.random(40, 100)})
  archivedCount: number;

  @field({mock: mocks.random(5, 10)})
  supportingCount: number;

  @field({mock: mocks.random(2, 5)})
  developingCount: number;

}

@model({
  mocking: (metrics: ProjectsMetrics) => {
    metrics.budgetSpent = metrics.budget - mocks.money(1000, 4000);
    metrics.budgetRemains = metrics.budget - metrics.budgetSpent;
    metrics.profit = metrics.budget - metrics.payroll;
  }
})
export class ProjectsMetrics {

  @field({mock: () => mocks.money(5000, 20000)})
  budget: number;

  @field()
  budgetSpent: number;

  @field()
  budgetRemains: number;

  @field({mock: () => mocks.money(3000, 10000)})
  payroll: number;

  @field()
  profit: number;

}

@model()
export class ProjectGroup {

  @field({mock: () => faker.random.uuid()})
  id: string;

  @field({
    mock: () => faker.helpers.randomize([
      'Microsoft',
      'Tesla',
      'Amazon'
    ])
  })
  title: string;

  @field({
    mock: () => faker.helpers.randomize([
      'Software / Microsoft',
      'Producers / Tesla',
      'Trading / Amazon'
    ])
  })
  fullTitle: string;

  @field({mock: () => faker.image.business()})
  glAvatar: string;

  @field({mock: () => faker.internet.url()})
  glUrl: string;

  @field({mock: ProjectsMetrics})
  metrics: ProjectsMetrics;
}

@model()
export class Project {

  @field({mock: context => context?.id || faker.random.uuid()})
  id: string;

  @field({
    mock: () => faker.helpers.randomize([
      'Azure',
      'Customers Billing',
      'CRM'
    ])
  })
  title: string;

  @field()
  fullTitle: string;

  @field({mock: ProjectGroup})
  group: ProjectGroup;

  @field({mock: () => faker.internet.url()})
  glUrl: string;

  @field({
    serializer: new EdgesToArray(() => Milestone),
    mock: {type: () => Milestone, length: 5}
  })
  milestones: ModelRef<Milestone>[];

  @field({mock: ProjectsMetrics})
  metrics: ProjectsMetrics;
}

@model()
export class ProjectsPaging implements Paging<Project> {

  @field({mock: () => mocks.random(10, 20)})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Project>(Project)),
    mock: {type: Project, length: 10}
  })
  results: Project[];
}

@model()
export class ProjectGroupsPaging implements Paging<ProjectGroup> {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<ProjectGroup>(ProjectGroup)),
    mock: {type: ProjectGroup, length: 10}
  })
  results: ProjectGroup[];
}

@model()
export class ProjectsFilter implements SearchFilter {

  @field()
  first: number;

  @field()
  offset: number;

  @field()
  state: ProjectState | null;

  constructor(defs: Partial<ProjectsFilter> = null) {
    Object.assign(this, defs);
  }

}
