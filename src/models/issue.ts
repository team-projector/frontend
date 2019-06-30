import {ArraySerializer, Field, Model, ModelSerializer, Name, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {ObjectLink} from './object-link';
import {LabelCard} from './label';
import {Paging} from './paging';
import {DateSerializer} from '../serializers/date';
import {DATE_FORMAT} from '../consts';
import {BooleanSerializer} from '../serializers/http';
import {Order, SearchFilter} from 'junte-ui';
import {User, UserCard} from './user';
import {PrimitiveSerializer} from 'serialize-ts/dist';
import {IssueProblemType} from './problem';
import {Project} from './project';
import {Milestone} from './milestone';

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

@Model()
@MockClass()
export class IssueMetrics {

  @Field()
  @MockFieldNested('{{int 10 100}}')
  remains: number;

  @Field()
  @MockFieldNested('{{efficiency}}')
  efficiency: number;

  @Field()
  @MockFieldNested('{{money}}')
  paid: number;

  @Field()
  @MockFieldNested('{{money}}')
  payroll: number;

}

@Model()
@MockClass()
export class IssueCard {

  @Field()
  @MockField('{{id}}')
  id: number;

  @Field()
  @MockField('{{issue}}')
  title: string;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(LabelCard)))
  @MockFieldNested('[{{#repeat 2 5}} {{> label_card}} {{/repeat}}]')
  labels: LabelCard[];

  @Field()
  @MockFieldNested('{{> object_link presentation=(project)}}')
  project: ObjectLink;

  @Field()
  @Name('due_date')
  @Type(new DateSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  dueDate: Date;

  @Field()
  @Name('time_estimate')
  @MockFieldNested('{{int 10 100}}')
  timeEstimate: number;

  @Field()
  @Name('time_spent')
  @MockFieldNested('{{int 10 100}}')
  timeSpent: number;

  @Field()
  @Name('total_time_spent')
  @MockFieldNested('{{int 10 100}}')
  totalTimeSpent: number;

  @Field()
  @Name('gl_url')
  @MockField('{{url}}')
  glUrl: string;

  @Field()
  @MockField(IssueState.opened)
  state: IssueState;

  @Field()
  @MockFieldNested('{{> issue_metrics}}')
  metrics: IssueMetrics;

  @Field()
  @MockFieldNested('{{> object_link presentation=(milestone)}}')
  milestone: ObjectLink;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(UserCard)))
  @MockFieldNested('[{{#repeat 1 3}} {{> user_card}} {{/repeat}}]')
  participants: UserCard[];

  @Field()
  @MockFieldNested('{{> user_card}}')
  user: UserCard;

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField('{{issue_problem}}')
  problems: IssueProblem[];
}

@Model()
@MockClass()
export class Issue {

  @Field()
  @MockField('{{id}}')
  id: number;

  @Field()
  @MockField('{{issue}}')
  title: string;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(LabelCard)))
  @MockFieldNested('[{{#repeat 2 5}} {{> label_card}} {{/repeat}}]')
  labels: LabelCard[];

  @Field()
  @MockFieldNested('{{> project}}')
  project: Project;

  @Field()
  @Name('due_date')
  @Type(new DateSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  dueDate: Date;

  @Field()
  @Name('time_estimate')
  @MockFieldNested('{{int 10 100}}')
  timeEstimate: number;

  @Field()
  @Name('time_spent')
  @MockFieldNested('{{int 10 100}}')
  timeSpent: number;

  @Field()
  @Name('total_time_spent')
  @MockFieldNested('{{int 10 100}}')
  totalTimeSpent: number;

  @Field()
  @Name('gl_url')
  @MockField('{{url}}')
  glUrl: string;

  @Field()
  @MockField(IssueState.opened)
  state: IssueState;

  @Field()
  @MockFieldNested('{{> issue_metrics}}')
  metrics: IssueMetrics;

  @Field()
  @MockFieldNested('{{> object_link presentation=(milestone)}}')
  milestone: Milestone;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(UserCard)))
  @MockFieldNested('[{{#repeat 1 3}} {{> user_card}} {{/repeat}}]')
  participants: UserCard[];

  @Field()
  @MockFieldNested('{{> user}}')
  user: User;

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField('{{issue_problem}}')
  problems: IssueProblem[];
}

@Model()
@MockClass()
export class ErrorCard {

  @Field()
  @MockFieldNested('{{> issue_card}}')
  issue: IssueCard;

  @Field()
  @MockField(ErrorType.issueWithoutDueDate)
  type: ErrorType;

}

@Model()
@MockClass()
export class PagingTeamIssues implements Paging<IssueCard> {
  @Field()
  @MockFieldNested('{{int 50 1000}}')
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(IssueCard)))
  @MockFieldNested('[{{#repeat 10 20}} {{> issue_card}} {{/repeat}}]')
  results: IssueCard[];
}


@Model()
@MockClass()
export class PagingErrorCard implements Paging<ErrorCard> {
  @Field()
  @MockFieldNested('{{int 50 1000}}')
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(ErrorCard)))
  @MockFieldNested('[{{#repeat 10 20}} {{> error_card}} {{/repeat}}]')
  results: ErrorCard[];
}


@Model()
@MockClass()
export class PagingIssues implements Paging<IssueCard> {

  @Field()
  @MockFieldNested('{{int 50 1000}}')
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(IssueCard)))
  @MockFieldNested('[{{#repeat 10 20}} {{> issue_card}} {{/repeat}}]')
  results: IssueCard[];

}

@Model()
export class IssuesFilter implements SearchFilter {

  @Field()
  @Type(new BooleanSerializer())
  metrics?: boolean;

  @Field()
  user?: number;

  @Field()
  team?: number;

  @Field()
  @Name('q')
  query?: string;

  @Field()
  @Type(new DateSerializer(DATE_FORMAT))
  @Name('due_date')
  dueDate?: Date;

  @Field()
  state?: IssueState | null;

  @Field()
  problems?: boolean | null;

  @Field()
  sort?: string;

  @Field()
  order?: Order = Order.asc;

  @Field()
  page?: number;

  @Field()
  @Name('page_size')
  pageSize?: number;

  constructor(defs: IssuesFilter = null) {
    this.metrics = true;
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@Model()
@MockClass()
export class IssuesSummary {

  @Field()
  @Name('issues_count')
  @MockFieldNested('{{int 10 100}}')
  issuesCount: number;

  @Field()
  @Name('time_spent')
  @MockFieldNested('{{int 10 100}}')
  timeSpent: number;


  @Field()
  @Name('problems_count')
  @MockFieldNested('{{int 10 100}}')
  problemsCount: number;

}

