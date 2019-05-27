import {ArraySerializer, Field, Model, ModelSerializer, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {Paging} from './paging';
import {SearchFilter} from 'junte-ui';
import {Name} from 'serialize-ts/dist';
import {DateSerializer} from '../serializers/date';
import {ObjectLink} from './object-link';

@Model()
@MockClass()
export class MilestoneMetrics {

  @Field()
  @Name('customer_payroll')
  @MockFieldNested('{{money}}')
  customerPayroll: number;

  @Field()
  @Name('payroll')
  @MockFieldNested('{{money}}')
  payroll: number;

  @Field()
  @Name('budget_remains')
  @MockFieldNested('{{money}}')
  budgetRemains: number;

  @Field()
  @Name('profit')
  @MockFieldNested('{{money}}')
  profit: number;

  @Field()
  @Name('time_estimate')
  @MockFieldNested('{{int 10 100}}')
  timeEstimate: number;

  @Field()
  @Name('time_spent')
  @MockFieldNested('{{int 10 100}}')
  timeSpent: number;

  @Field()
  @Name('time_remains')
  @MockFieldNested('{{int 10 100}}')
  timeRemains: number;

  @Field()
  @MockFieldNested('{{efficiency}}')
  efficiency: number;

  @Field()
  @Name('issues_count')
  @MockFieldNested('{{int 10 100}}')
  issuesCount: number;

  @Field()
  @Name('issues_opened_count')
  @MockFieldNested('{{int 10 100}}')
  issuesOpenedCount: number;

  @Field()
  @Name('issues_closed_count')
  @MockFieldNested('{{int 10 100}}')
  issuesClosedCount: number;

}

@Model()
@MockClass()
export class MilestoneCard {

  @Field()
  @MockField('{{id}}')
  id: number;

  @Field()
  @MockField('{{title}}')
  title: string;

  @Field()
  @MockFieldNested('{{> object_link presentation=(project)}}')
  owner: ObjectLink;

  @Field()
  @MockFieldNested('{{money}}')
  budget: number;

  @Field()
  @Name('start_date')
  @MockField('{{date \'2019\' \'2020\'}}')
  startDate: Date;

  @Field()
  @Name('due_date')
  @Type(new DateSerializer())
  @MockField('{{date \'2019\' \'2020\'}}')
  dueDate: Date;

  @Field()
  @MockFieldNested('{{> milestone_metrics}}')
  metrics: MilestoneMetrics;
}

@Model()
@MockClass()
export class PagingMilestones implements Paging<MilestoneCard> {

  @Field()
  @MockFieldNested('{{int 3 10}}')
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(MilestoneCard)))
  @MockFieldNested('[{{#repeat 3 10}} {{> milestone_card}} {{/repeat}}]')
  results: MilestoneCard[];
}

@Model()
export class MilestonesFilter implements SearchFilter {

  @Field()
  active?: boolean;

  @Field()
  page?: number;

  @Field()
  @Name('page_size')
  pageSize?: number;

  constructor(defs: MilestonesFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
