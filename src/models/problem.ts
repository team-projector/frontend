import {ArraySerializer, Field, Model, ModelSerializer, Name, Type} from 'serialize-ts';
import {MockClass, MockField, MockFieldNested} from '../decorators/mock';
import {IssueCard} from './issue';
import {Paging} from './paging';
import {SearchFilter} from '../components/shared/table/models';
import {PrimitiveSerializer} from 'serialize-ts/dist/serializers/primitive.serializer';

export enum IssueProblemType {
  overDueDate = 'over_due_date',
  emptyDueDate = 'empty_due_date',
  emptyEstimate = 'empty_estimate'
}

@Model()
@MockClass()
export class IssueProblemCard {

  @Field()
  @Type(new ArraySerializer(new PrimitiveSerializer()))
  @MockField('{{issue_problem}}')
  problems: IssueProblemType[];

  @Field()
  @MockFieldNested('{{> issue_card}}')
  issue: IssueCard;
}

@Model()
@MockClass()
export class PagingIssueProblems implements Paging<IssueProblemCard> {

  @Field()
  @MockFieldNested('{{int 50 1000}}')
  count: number;

  @Field()
  @Type(new ArraySerializer(new ModelSerializer(IssueProblemCard)))
  @MockFieldNested('[{{#repeat 10 20}} {{> issue_problem_card}} {{/repeat}}]')
  results: IssueProblemCard[];

}

@Model()
export class IssueProblemsFilter implements SearchFilter {

  @Field()
  user?: number;

  @Field()
  page?: number;

  @Field()
  @Name('page_size')
  pageSize?: number;

  constructor(defs: IssueProblemsFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
