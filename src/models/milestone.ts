import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { Paging } from './paging';
import { SearchFilter } from 'junte-ui';
import { DateSerializer } from '../serializers/date';
import { Project, ProjectGroup } from './project';
import { ProjectSerializer } from '../serializers/project';
import { field, model } from '@junte/mocker-library';
import { EdgesToPaging } from '../serializers/graphql';

@model()
export class MilestoneMetrics {

  @field({mock: '{{money}}'})
  customerPayroll: number;

  @field({mock: '{{money}}'})
  payroll: number;

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
