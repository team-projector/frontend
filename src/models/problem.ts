import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { IssueCard } from './issue';
import { Paging } from './paging';
import { PrimitiveSerializer } from 'serialize-ts/dist/serializers/primitive.serializer';
import { SearchFilter } from 'junte-ui';
import { DateSerializer } from '../serializers/date';
import { DATE_FORMAT } from '../consts';
import { field, model } from '@junte/mocker-library';

export enum IssueProblemType {
  overDueDate = 'over_due_date',
  emptyDueDate = 'empty_due_date',
  emptyEstimate = 'empty_estimate'
}

@model()
export class IssueProblemCard {

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: '{{issue_problem}}'
  })
  problems: IssueProblemType[];

  @field({mock: '{{> issue_card}}'})
  issue: IssueCard;
}

@model()
export class PagingIssueProblems implements Paging<IssueProblemCard> {

  @field({mock: '{{int 50 1000}}'})
  count: number;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(IssueProblemCard)),
    mock: '[{{#repeat 10 20}} {{> issue_problem_card}} {{/repeat}}]'
  })
  results: IssueProblemCard[];

}

@model()
export class IssueProblemsFilter implements SearchFilter {

  @field()
  page?: number;

  @field({name: 'page_size'})
  pageSize?: number;

  constructor(defs: IssueProblemsFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}

@model()
export class TeamIssueFilter implements SearchFilter {

  @field()
  user?: number;

  @field({
    name: 'due_date',
    serializer: new DateSerializer(DATE_FORMAT)
  })
  dueDate?: Date;

  @field()
  page?: number;

  @field({name: 'page_size'})
  pageSize?: number;

  constructor(defs: TeamIssueFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
