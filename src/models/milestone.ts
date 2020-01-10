import { field, model } from '../decorators/model';
import { SearchFilter } from 'junte-ui';
import { ArraySerializer } from 'serialize-ts';
import { PrimitiveSerializer } from 'serialize-ts/dist';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { ProjectSerializer } from '../serializers/project';
import { Paging } from './paging';
import { Project, ProjectGroup } from './project';

export enum MilestoneProblem {
  overDueDate = 'OVER_DUE_DATE'
}

@model()
export class MilestoneMetrics {

  @field({mock: ''})
  customerPayroll: number;

  @field({mock: ''})
  payroll: number;

  @field({mock: ''})
  budgetSpent: number;

  @field({mock: ''})
  budgetRemains: number;

  @field({mock: ''})
  profit: number;

  @field({mock: ''})
  timeEstimate: number;

  @field({mock: ''})
  timeSpent: number;

  @field({mock: ''})
  timeRemains: number;

  @field({mock: ''})
  efficiency: number;

  @field({mock: ''})
  issuesCount: number;

  @field({mock: ''})
  issuesOpenedCount: number;

  @field({mock: ''})
  issuesClosedCount: number;

}

@model()
export class Milestone {

  @field({mock: ''})
  id: string;

  @field({mock: ''})
  title: string;

  @field({
    serializer: new ProjectSerializer(),
    mock: ''
  })
  owner: Project | ProjectGroup;

  @field({mock: ''})
  budget: number;

  @field({mock: ''})
  startDate: Date;

  @field({
    serializer: new DateSerializer(),
    mock: ''
  })
  dueDate: Date;

  @field({mock: ''})
  metrics: MilestoneMetrics;

  @field({mock: ''})
  glUrl: string;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: ''
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
    mock: ''
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
