import {ArraySerializer, Field, Model, ModelSerializer, Name, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../../../decorators/mock';
import {DateSerializer} from '../../../serializers/date';
import {Order, SearchFilter} from 'junte-ui';
import {PrimitiveSerializer} from 'serialize-ts/dist';
import {EdgesToArray, EdgesToPaging, TypedDateVariable, TypedIdVariable} from '../../../serializers/graphql';
import {DynamicField} from '../../../serializers/internal';
import {IssueProblem, IssueState} from '../../../models/issue';
import {UserMetrics} from '../../../models/user-metrics';
import {UserProblem, UserRole} from '../../../models/user';
import {Paging} from '../../../models/paging';

@MockClass()
export class Label {

  @Field()
  @MockField('{{label}}')
  title: string;

  @Field()
  @MockField('{{color}}')
  color: string;

}

@Model()
@MockClass()
export class User {

  @Field()
  @MockFieldNested('{{int 0 100}}')
  id: number;

  @Field()
  @MockField('{{login}}')
  login: string;

  @Field()
  @MockField('{{firstName}} {{lastName}}')
  name: string;

  @Field()
  @Name('glAvatar')
  @MockField('{{avatar}}')
  avatar: string;

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField([UserRole.developer, UserRole.customer, UserRole.projectManager, UserRole.shareholder, UserRole.teamLeader])
  roles: UserRole[];

  @Field()
  @MockFieldNested('{{> user_metrics}}')
  metrics: UserMetrics;

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField('{{user_problem}}')
  problems: UserProblem[];

}

@Model()
@MockClass()
export class Project {

  @Field()
  @MockField('{{id}}')
  id: number;

  @Field()
  @MockField('{{project}}')
  title: string;

  @Field()
  @MockField('{{project}}')
  fullTitle: string;

  @Field()
  @Name('gl_url')
  @MockField('{{url}}')
  glUrl: string;
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
  @Type(new EdgesToArray(Label))
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
  @Type(new EdgesToArray(User))
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
@MockClass()
export class PagingIssues implements Paging<Issue> {

  @Field()
  @MockFieldNested('{{int 50 1000}}')
  count: number;

  @Field()
  @Name('edges')
  @Type(new ArraySerializer(new EdgesToPaging<Issue>(Issue)))
  @MockFieldNested('[{{#repeat 10 20}} {{> issue}} {{/repeat}}]')
  results: Issue[];

}

@Model()
export class IssuesFilter implements SearchFilter {

  @Field()
  @Type(new TypedIdVariable())
  team?: number;

  @Field()
  @Type(new TypedIdVariable())
  user?: number;

  @Field()
  @Type(new TypedDateVariable())
  dueDate?: Date;

  @Field()
  state?: IssueState | null;

  @Field()
  problems?: boolean | null;

  query?: string;
  sort?: string;
  orderBy?: Order = Order.asc;
  page?: number;

  @Field()
  @Name('orderBy')
  @Type(new DynamicField())
  ordering? = () => !!this.sort ? (this.orderBy === Order.asc ? '' : '-') + this.sort : '';

  @Field()
  @Type(new DynamicField())
  offset? = () => (this.page - 1) * this.pageSize;

  @Field()
  @Name('first')
  pageSize?: number;

  constructor(defs: IssuesFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
