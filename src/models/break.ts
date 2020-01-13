import { field, model } from '../decorators/model';
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
  created = 'CREATED',
  decline = 'DECLINED',
  approved = 'APPROVED'
}

export enum BreakReasons {
  dayoff = 'DAYOFF',
  vacation = 'VACATION',
  disease = 'DISEASE'
}

@model()
export class Break {

  @field({mock: ''})
  id: number;

  @field()
  user: User;

  @field()
  approvedBy: User;

  @field({
    serializer: new DateSerializer(),
    mock: ''
  })
  createdAt: Date;

  @field({
    serializer: new DateSerializer(),
    mock: ''
  })
  approvedAt: Date;

  @field({
    serializer: new DateSerializer(),
    mock: ''
  })
  toDate: Date;

  @field({
    serializer: new DateSerializer(),
    mock: ''
  })
  fromDate: Date;

  @field({mock: ''})
  comment: string;

  @field({mock: BreakReasons.dayoff})
  reason: BreakReasons;

  @field({mock: BreakState.created})
  state: BreakState;

  @field({mock: BreakState.created})
  approveState: BreakState;

  @field({mock: ''})
  declineReason: string;

}

@model()
export class BreakUpdate {

  @field()
  id: string;

  @field()
  user: string;

  @field()
  reason: BreakReasons;

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
export class BreakDecline {

  @field()
  id: string;

  @field()
  declineReason: string;

  constructor(decline: BreakDecline) {
    Object.assign(this, decline);
  }
}

@model()
export class PagingBreaks implements Paging<Break> {

  @field({mock: ''})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Break>(Break)),
    mock: ''
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
