import {ArraySerializer, Field, Model, ModelSerializer, Name, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {ObjectLink} from './object-link';
import {LabelCard} from './label';
import {Project} from './project';
import {Paging} from './paging';
import {Moment} from 'moment';
import {MomentSerializer} from '../serializers/moment';
import {Order, SearchFilter} from '../components/shared/table/models';
import {DATE_FORMAT} from '../consts';

export enum IssueState {
  opened = 'opened',
  closed = 'closed'
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
  @Type(new MomentSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  dueDate: Moment;

  @Field()
  @Name('time_estimate')
  @MockFieldNested('{{time}}')
  timeEstimate: number;

  @Field()
  @Name('time_spent')
  @MockFieldNested('{{time}}')
  timeSpent: number;

  @Field()
  @MockFieldNested('{{efficiency}}')
  efficiency: number;

  @Field()
  @MockFieldNested('{{money}}')
  earnings: number;

  @Field()
  @Name('gl_url')
  @MockField('{{url}}')
  glUrl: string;

  @Field()
  @MockField(IssueState.opened)
  state: IssueState;
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
  @Name('employee')
  user?: number;

  @Field()
  @Name('q')
  query?: string;

  @Field()
  @Type(new MomentSerializer(DATE_FORMAT))
  @Name('due_date')
  dueDate?: Moment;

  @Field()
  state?: IssueState;

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
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
