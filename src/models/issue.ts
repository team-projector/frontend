import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { ObjectLink } from './object-link';
import { LabelCard } from './label';
import { Paging } from './paging';
import { DateSerializer } from '../serializers/date';
import { DATE_FORMAT } from '../consts';
import { BooleanSerializer } from '../serializers/http';
import { Order, SearchFilter } from 'junte-ui';
import { User, UserCard } from './user';
import { PrimitiveSerializer } from 'serialize-ts/dist';
import { Project } from './project';
import { Milestone } from './milestone';
import { field, model } from '@junte/mocker-library';

export enum IssueState {
  opened = 'opened',
  closed = 'closed'
}

export enum IssueProblem {
  overDueDate = 'over_due_date',
  emptyDueDate = 'empty_due_date',
  emptyEstimate = 'empty_estimate'
}

export enum ErrorType {
  issueWithoutDueDate = 'issue_without_due_date',
  issueWithoutEstimate = 'issue_without_estimate'
}

@model()
export class IssueMetrics {

  @field({mock: '{{int 10 100}}'})
  remains: number;

  @field({mock: '{{efficiency}}'})
  efficiency: number;

  @field({mock: '{{money}}'})
  paid: number;

  @field({mock: '{{money}}'})
  payroll: number;

}

@model()
export class IssueCard {

  @field({mock: '{{int 1 100}}'})
  id: number;

  @field({mock: '{{issue}}'})
  title: string;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(LabelCard)),
    mock: '[{{#repeat 2 5}} {{> label_card}} {{/repeat}}]'
  })
  labels: LabelCard[];

  @field({mock: '{{> object_link presentation=(project)}}'})
  project: ObjectLink;

  @field({
    name: 'due_date',
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  dueDate: Date;

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
    name: 'total_time_spent',
    mock: '{{int 10 100}}'
  })
  totalTimeSpent: number;

  @field({
    name: 'gl_url',
    mock: '{{url}}'
  })
  glUrl: string;

  @field({mock: IssueState.opened})
  state: IssueState;

  @field({mock: '{{> issue_metrics}}'})
  metrics: IssueMetrics;

  @field({mock: '{{> object_link presentation=(milestone)}}'})
  milestone: ObjectLink;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(UserCard)),
    mock: '[{{#repeat 1 3}} {{> user_card}} {{/repeat}}]'
  })
  participants: UserCard[];

  @field({mock: '{{> user_card}}'})
  user: UserCard;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: '{{issue_problem}}'
  })
  problems: IssueProblem[];
}

@model()
export class Issue {

  @field({mock: '{{int 1 1000}}'})
  id: number;

  @field({mock: '{{issue}}'})
  title: string;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(LabelCard)),
    mock: '[{{#repeat 2 5}} {{> label_card}} {{/repeat}}]'
  })
  labels: LabelCard[];

  @field({mock: '{{> project}}'})
  project: Project;

  @field({
    name: 'due_date',
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  dueDate: Date;

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
    name: 'total_time_spent',
    mock: '{{int 10 100}}'
  })
  totalTimeSpent: number;

  @field({
    name: 'gl_url',
    mock: '{{url}}'
  })
  glUrl: string;

  @field({mock: IssueState.opened})
  state: IssueState;

  @field({mock: '{{> issue_metrics}}'})
  metrics: IssueMetrics;

  @field({mock: '{{> object_link presentation=(milestone)}}'})
  milestone: Milestone;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(UserCard)),
    mock: '[{{#repeat 1 3}} {{> user_card}} {{/repeat}}]'
  })
  participants: UserCard[];

  @field({mock: '{{> user}}'})
  user: User;

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: '{{issue_problem}}'
  })
  problems: IssueProblem[];
}

@model()
export class ErrorCard {

  @field({mock: '{{> issue_card}}'})
  issue: IssueCard;

  @field({mock: ErrorType.issueWithoutDueDate})
  type: ErrorType;

}

@model()
export class PagingTeamIssues implements Paging<IssueCard> {

  @field({mock: '{{int 50 1000}}'})
  count: number;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(IssueCard)),
    mock: '[{{#repeat 10 20}} {{> issue_card}} {{/repeat}}]'
  })
  results: IssueCard[];
}


@model()
export class PagingErrorCard implements Paging<ErrorCard> {

  @field({mock: '{{int 50 1000}}'})
  count: number;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(ErrorCard)),
    mock: '[{{#repeat 10 20}} {{> error_card}} {{/repeat}}]'
  })
  results: ErrorCard[];
}


@model()
export class PagingIssues implements Paging<IssueCard> {

  @field({mock: '{{int 50 1000}}'})
  count: number;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(IssueCard)),
    mock: '[{{#repeat 10 20}} {{> issue_card}} {{/repeat}}]'
  })
  results: IssueCard[];

}

@model()
export class IssuesFilter implements SearchFilter {

  @field({serializer: new BooleanSerializer()})
  metrics?: boolean;

  @field()
  user?: number;

  @field()
  team?: number;

  @field({name: 'q'})
  query?: string;

  @field({
    name: 'due_date',
    serializer: new DateSerializer(DATE_FORMAT)
  })
  dueDate?: Date;

  @field()
  state?: IssueState | null;

  @field()
  problems?: boolean | null;

  @field()
  sort?: string;

  @field()
  order?: Order = Order.asc;

  @field()
  page?: number;

  @field({name: 'page_size'})
  pageSize?: number;

  constructor(defs: IssuesFilter = null) {
    this.metrics = true;
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@model()
export class IssuesSummary {

  @field({
    name: 'issues_count',
    mock: '{{int 10 100}}'
  })
  issuesCount: number;

  @field({
    name: 'time_spent',
    mock: '{{int 10 100}}'
  })
  timeSpent: number;


  @field({
    name: 'problems_count',
    mock: '{{int 10 100}}'
  })
  problemsCount: number;

}

