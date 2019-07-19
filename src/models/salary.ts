import {ArraySerializer, ModelSerializer} from 'serialize-ts';
import {DateSerializer} from '../serializers/date';
import {Paging} from './paging';
import {SearchFilter} from 'junte-ui';
import {field, model} from '@junte/mocker-library';
import {EdgesToPaging} from '../serializers/graphql';

@model()
export class Salary {

  @field({mock: '{{int 1 1000}}'})
  id: number;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  createdAt: Date;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  periodTo: Date;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  periodFrom: Date;

  @field({
    name: 'charged_time',
    mock: '{{int 144000 288000}}'
  })
  chargedTime: number;

  @field({mock: '{{int 1000 5000}}'})
  bonus: number;

  @field({mock: '{{int 250 500}}'})
  taxes: number;

  @field({mock: '{{int 500 1000}}'})
  penalty: number;

  @field({mock: '{{int 10000 20000}}'})
  sum: number;

  @field({mock: '{{int 30000 50000}}'})
  total: number;

  @field({mock: '{{boolean}}'})
  payed: boolean;

}

@model()
export class PagingSalaries implements Paging<Salary> {

  @field({mock: '{{int 10 20}}'})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Salary>(Salary)),
    mock: '[{{#repeat 5 15}} {{> salary }} {{/repeat}}]'
  })
  results: Salary[];

}

@model()
export class SalariesFilter implements SearchFilter {

  @field()
  user?: number;

  @field()
  first?: number;

  @field()
  offset?: number;

  constructor(defs: SalariesFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}