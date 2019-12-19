import { field, model } from '@junte/mocker-library';
import { SearchFilter } from 'junte-ui';
import { ArraySerializer, ModelSerializer, PrimitiveSerializer } from 'serialize-ts';
import { DATE_TIME_FORMAT } from '../consts';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { Paging } from './paging';
import { User } from './user';

export enum BreakState {
  created = 'created',
  decline = 'decline',
  approved = 'approved'
}

export enum BreaksType {
  all = 'all',
  created = 'created',
  decline = 'decline',
  approved = 'approved'
}

export enum BreakReason {
  dayoff = 'DAYOFF',
  vacation = 'VACATION',
  disease = 'DISEASE'
}

@model()
export class Break {

  @field({mock: '{{id}}'})
  id: number;

  @field({mock: '{{> user}}'})
  user: User;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  createdAt: Date;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  toDate: Date;

  @field({
    serializer: new DateSerializer(),
    mock: '{{date \'2019\' \'2020\'}}'
  })
  fromDate: Date;

  @field({mock: '{{comment}}'})
  comment: string;

  @field({mock: BreakReason.dayoff})
  reason: BreakReason;

  @field({mock: BreakState.created})
  state: BreakState;

  @field({mock: BreakState.created})
  approveState: BreakState;

}

@model()
export class BreakUpdate {

  @field()
  id: string;

  @field()
  user: string;

  @field()
  reason: BreakReason;

  @field()
  comment: string;

  @field({serializer: new DateSerializer(DATE_TIME_FORMAT)})
  fromDate: Date;

  @field({serializer: new DateSerializer(DATE_TIME_FORMAT)})
  toDate: Date;

  constructor(update: BreakUpdate) {
    Object.assign(this, update);
  }
}

@model()
export class PagingBreaks implements Paging<Break> {

  @field({mock: '{{int 50 1000}}'})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Break>(Break)),
    mock: '[{{#repeat 10 20}} {{> break}} {{/repeat}}]'
  })
  results: Break[];

}

@model()
export class BreaksFilter implements SearchFilter {

  @field()
  user?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  q?: string;

  @field()
  team?: string;

  constructor(defs: BreaksFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
