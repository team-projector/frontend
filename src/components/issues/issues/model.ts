import { DateSerializer } from '../../../serializers/date';
import { Order, SearchFilter } from 'junte-ui';
import { ArraySerializer, PrimitiveSerializer } from 'serialize-ts';
import { EdgesToArray, EdgesToPaging, TypedDateVariable, TypedIdVariable } from '../../../serializers/graphql';
import { DynamicField } from '../../../serializers/internal';
import { UserMetrics } from '../../../models/user-metrics';
import { UserProblem, UserRole } from '../../../models/user';
import { Paging } from '../../../models/paging';
import { field, model } from '@junte/mocker-library';
import { IssueProblem, IssueState } from '../../../models/issue';

@model()
export class Label {

  @field({mock: '{{label}}'})
  title: string;

  @field({mock: '{{color}}'})
  color: string;

}

@model()
export class User {

  @field({mock: '{{int 0 100}}'})
  id: number;

  @field({mock: '{{login}}'})
  login: string;

  @field({mock: '{{firstName}} {{lastName}}'})
  name: string;

  @field({
    name: 'glAvatar',
    mock: '{{avatar}}'
  })
  avatar: string;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: [UserRole.developer, UserRole.customer, UserRole.projectManager, UserRole.shareholder, UserRole.teamLeader]
  })
  roles: UserRole[];

  @field({mock: '{{> user_metrics}}'})
  metrics: UserMetrics;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: '{{user_problem}}'
  })
  problems: UserProblem[];

}

@model()
export class Project {

  @field({mock: '{{id}}'})
  id: number;

  @field({mock: '{{project}}'})
  title: string;

  @field({mock: '{{project}}'})
  fullTitle: string;

  @field({
    name: 'gl_url',
    mock: '{{url}}'
  })
  glUrl: string;
}

@model()
export class IssueMetrics {

  @field({mock: '{{int 10 100}}'})
  remains: number;

  @field({mock: '{{efficiency}}'})
  efficiency: number;

  @field({mock: '{{money}}'})
  payroll: number;

  @field({mock: '{{money}}'})
  paid: number;

}

@model()
export class Issue {

  @field({mock: '{{id}}'})
  id: number;

  @field({mock: '{{issue}}'})
  title: string;

  @field({
    serializer: new EdgesToArray(Label),
    mock: '[{{#repeat 2 5}} {{> label}} {{/repeat}}]'
  })
  labels: Label[];

  @field({mock: '{{> project}}'})
  project: Project;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  dueDate: Date;

  @field({mock: '{{int 10 100}}'})
  timeEstimate: number;

  @field({mock: '{{int 10 100}}'})
  timeSpent: number;

  @field({mock: '{{int 10 100}}'})
  totalTimeSpent: number;

  @field({mock: '{{url}}'})
  glUrl: string;

  @field({mock: IssueState.opened})
  state: IssueState;

  @field({mock: '{{> issue_metrics}}'})
  metrics: IssueMetrics;

  @field({
    serializer: new EdgesToArray(User),
    mock: '[{{#repeat 1 3}} {{> user}} {{/repeat}}]'
  })
  participants: User[];

  @field({mock: '{{> user}}'})
  user: User;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: '{{issue_problem}}'
  })
  problems: IssueProblem[];
}

@model()
export class PagingIssues implements Paging<Issue> {

  @field({mock: '{{int 50 1000}}'})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Issue>(Issue)),
    mock: '[{{#repeat 10 20}} {{> issue}} {{/repeat}}]'
  })
  results: Issue[];

}

@model()
export class IssuesFilter implements SearchFilter {

  @field({serializer: new TypedIdVariable()})
  team?: number;

  @field({serializer: new TypedIdVariable()})
  user?: number;

  @field({serializer: new TypedDateVariable()})
  dueDate?: Date;

  @field()
  state?: IssueState | null;

  @field()
  problems?: boolean | null;

  query?: string;
  sort?: string;
  orderBy?: Order = Order.asc;
  page?: number;

  @field({
    name: 'orderBy',
    serializer: new DynamicField()
  })
  ordering? = () => !!this.sort ? (this.orderBy === Order.asc ? '' : '-') + this.sort : '';

  @field({
    serializer: new DynamicField()
  })
  offset? = () => (this.page - 1) * this.pageSize;

  @field({name: 'first'})
  pageSize?: number;

  constructor(defs: IssuesFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
