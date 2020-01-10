import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { DateSerializer } from '../serializers/date';
import { Paging } from './paging';
import { SearchFilter } from 'junte-ui';
import { field, model } from '../decorators/model';
import { EdgesToPaging } from '../serializers/graphql';
import { DEFAULT_PAGE_SIZE } from 'src/consts';

@model()
export class Salary {

  @field({mock: ''})
  id: number;

  @field({
    serializer: new DateSerializer(),
    mock: ''
  })
  createdAt: Date;

  @field({
    serializer: new DateSerializer(),
    mock: ''
  })
  periodTo: Date;

  @field({
    serializer: new DateSerializer(),
    mock: ''
  })
  periodFrom: Date;

  @field({mock: ''})
  chargedTime: number;

  @field({mock: ''})
  bonus: number;

  @field({mock: ''})
  taxes: number;

  @field({mock: ''})
  penalty: number;

  @field({mock: ''})
  sum: number;

  @field({mock: ''})
  total: number;

  @field({mock: ''})
  payed: boolean;

}

@model()
export class PagingSalaries implements Paging<Salary> {

  @field({mock: ''})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Salary>(Salary)),
    mock: ''
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
    Object.assign(this, defs || {offset: 0, first: DEFAULT_PAGE_SIZE});
  }

}
