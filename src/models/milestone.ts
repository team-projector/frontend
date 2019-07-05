import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { Paging } from './paging';
import { SearchFilter } from 'junte-ui';
import { DateSerializer } from '../serializers/date';
import { Project, ProjectCard, ProjectGroup, ProjectGroupCard } from './project';
import { ProjectSerializer } from '../serializers/project';
import { field, model } from '@junte/mocker-library';

@model()
export class MilestoneMetrics {

  @field({
    name: 'customer_payroll',
    mock: '{{money}}'
  })
  customerPayroll: number;

  @field({
    name: 'payroll',
    mock: '{{money}}'
  })
  payroll: number;

  @field({
    name: 'budget_remains',
    mock: '{{money}}'
  })
  budgetRemains: number;

  @field({
    name: 'profit',
    mock: '{{money}}'
  })
  profit: number;

  @field({
    name: 'time_estimate',
    mock: '{{int 10 100}}'
  })
  timeEstimate: number;

  @field({
    name: 'time_spent',
    mock: '{{int 10 100}}'
  })
  timeSpent: number;

  @field({
    name: 'time_remains',
    mock: '{{int 10 100}}'
  })
  timeRemains: number;

  @field({mock: '{{efficiency}}'})
  efficiency: number;

  @field({
    name: 'issues_count',
    mock: '{{int 10 100}}'
  })
  issuesCount: number;

  @field({
    name: 'issues_opened_count',
    mock: '{{int 10 100}}'
  })
  issuesOpenedCount: number;

  @field({
    name: 'issues_closed_count',
    mock: '{{int 10 100}}'
  })
  issuesClosedCount: number;

}

@model()
export class MilestoneCard {

  @field({mock: '{{int 1 1000}}'})
  id: number;

  @field({mock: '{{title}}'})
  title: string;

  @field({
    serializer: new ProjectSerializer(),
    mock: '{{> project_card}}'
  })
  owner: ProjectCard | ProjectGroupCard;

  @field({mock: '{{money}}'})
  budget: number;

  @field({
    name: 'start_date',
    mock: '{{date \'2019\' \'2020\'}}'
  })
  startDate: Date;

  @field({
    name: 'due_date',
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  dueDate: Date;

  @field({
    mock: '{{> milestone_metrics}}'
  })
  metrics: MilestoneMetrics;

  @field({
    name: 'gl_url',
    mock: '{{url}}'
  })
  glUrl: string;
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

  @field({
    name: 'start_date',
    mock: '{{date \'2019\' \'2020\'}}'
  })
  startDate: Date;

  @field({
    name: 'due_date',
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  dueDate: Date;

  @field({mock: '{{> milestone_metrics}}'})
  metrics: MilestoneMetrics;

  @field({
    name: 'gl_url',
    mock: '{{url}}'
  })
  glUrl: string;
}

@model()
export class PagingMilestones implements Paging<MilestoneCard> {

  @field({mock: '{{int 3 10}}'})
  count: number;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(MilestoneCard)),
    mock: '[{{#repeat 3 10}} {{> milestone_card}} {{/repeat}}]'
  })
  results: MilestoneCard[];
}

@model()
export class MilestonesFilter implements SearchFilter {

  @field()
  active?: boolean;

  @field()
  page?: number;

  @field({name: 'page_size'})
  pageSize?: number;

  constructor(defs: MilestonesFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
