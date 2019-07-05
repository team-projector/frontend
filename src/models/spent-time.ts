import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { Paging } from './paging';
import { DateSerializer } from '../serializers/date';
import { IssueCard } from './issue';
import { DATE_FORMAT } from '../consts';
import { OwnerSerializer } from '../serializers/owner';
import { field, model } from '@junte/mocker-library';

@model()
export class SpentTimeCard {

  @field({mock: '{{id}}'})
  id: number;

  @field({
    name: 'created_at',
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  createdAt: Date;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  date: Date;

  @field({
    serializer: new OwnerSerializer(),
    mock: '{{> issue_card}}'
  })
  owner: IssueCard;

  @field({
    name: 'time_spent',
    mock: '{{int 10 100}}'
  })
  timeSpent: number;

  @field({mock: '{{money}}'})
  earnings: number;
}

@model()
export class PagingTimeExpenses implements Paging<SpentTimeCard> {

  @field({mock: '{{int 50 1000}}'})
  count: number;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(SpentTimeCard)),
    mock: '[{{#repeat 10 20}} {{> spent_time_card}} {{/repeat}}]'
  })
  results: SpentTimeCard[];

}

@model()
export class TimeExpensesFilter {

  @field()
  team?: number;

  @field()
  user?: number;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  date?: Date;

  @field()
  salary?: number;

  @field()
  page: number;

  @field({mock: 'page_size'})
  pageSize: number;

  constructor(defs: TimeExpensesFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
