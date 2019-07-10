import {ArraySerializer, Field, Model, ModelSerializer, Name, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {Label} from './label';
import {DateSerializer} from '../serializers/date';
import {Order, SearchFilter} from 'junte-ui';
import {User} from './user';
import {PrimitiveSerializer} from 'serialize-ts/dist';
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
  payroll: number;

  @Field()
  @MockFieldNested('{{money}}')
  paid: number;

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
  @Type(new ArraySerializer(new ModelSerializer(Label)))
  @MockFieldNested('[{{#repeat 2 5}} {{> label}} {{/repeat}}]')
  labels: Label[];

  @Field()
  @MockFieldNested('{{> project}}')
  project: Project;

  @Field()
  @Type(new DateSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  dueDate: Date;

  @Field()
  @MockFieldNested('{{int 10 100}}')
  timeEstimate: number;

  @Field()
  @MockFieldNested('{{int 10 100}}')
  timeSpent: number;

  @Field()
  @MockFieldNested('{{int 10 100}}')
  totalTimeSpent: number;

  @Field()
  @MockField('{{url}}')
  glUrl: string;

  @Field()
  @MockField(IssueState.opened)
  state: IssueState;

  @Field()
  @MockFieldNested('{{> issue_metrics}}')
  metrics: IssueMetrics;

  @Field()
  @MockFieldNested('{{> milestone}}')
  milestone: Milestone;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(User)))
  @MockFieldNested('[{{#repeat 1 3}} {{> user}} {{/repeat}}]')
  participants: User[];

  @Field()
  @MockFieldNested('{{> user}}')
  user: User;

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField('{{issue_problem}}')
  problems: IssueProblem[];
}

@Model()
export class IssuesFilter implements SearchFilter {

  @Field()
  team?: number;

  @Field()
  user?: number;

  @Field()
  dueDate?: Date;

  @Field()
  state?: IssueState | null;

  @Field()
  problems?: boolean | null;

  @Field()
  @Name('q')
  query?: string;

  @Field()
  sort?: string;

  @Field()
  orderBy?: Order = Order.asc;

  @Field()
  page?: number;

  @Field()
  pageSize?: number;

  constructor(defs: IssuesFilter = null) {
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
