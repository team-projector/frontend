import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { DateSerializer } from '../serializers/date';
import { Paging } from './paging';
import { SearchFilter } from 'junte-ui';
import { field, model } from '@junte/mocker-library';

@model()
export class Salary {

  @field({mock: '{{int 1 1000}}'})
  id: number;

  @field({
    name: 'charged_time',
    mock: '{{int 144000 288000}}'
  })
  chargedTime: number;

  @field({mock: '{{boolean}}'})
  payed: boolean;

  @field({mock: '{{int 1000 5000}}'})
  bonus: number;

  @field({
    name: 'created_at',
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  createdAt: Date;

  @field({
    name: 'period_to',
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  periodTo: Date;

  @field({
    name: 'period_from',
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  periodFrom: Date;

  @field({mock: '{{int 250 500}}'})
  taxes: number;

  @field({mock: '{{int 500 1000}}'})
  penalty: number;

  @field({mock: '{{int 10000 20000}}'})
  sum: number;

  @field({mock: '{{int 30000 50000}}'})
  total: number;

}

@model()
export class PagingSalaries implements Paging<Salary> {

  @field({mock: '{{int 10 20}}'})
  count: number;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(Salary)),
    mock: '[{{#repeat 5 15}} {{> salary }} {{/repeat}}]'
  })
  results: Salary[];

}

@model()
export class SalariesFilter implements SearchFilter {

  @field()
  user?: number;

  @field()
  page?: number;

  @field({name: 'page_size'})
  pageSize?: number;

  constructor(defs: SalariesFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
