import { IssueState } from 'src/models/enums/issue';
import { field, model } from '../decorators/model';
import { SearchFilter } from 'junte-ui';
import { ArraySerializer, ModelSerializer, PrimitiveSerializer } from 'serialize-ts';
import { DATE_TIME_FORMAT } from '../consts';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { Paging } from './paging';
import { User } from './user';
import * as faker from 'faker';
import { helpers } from 'faker';

export enum BreakState {
  created = 'CREATED',
  decline = 'DECLINED',
  approved = 'APPROVED'
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

  @field({mock: () => faker.random.uuid()})
  id: number;

  @field()
  user: User;

  @field()
  approvedBy: User;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  createdAt: Date;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  approvedAt: Date;

  @field({mock: () => faker.date.future(), serializer: new DateSerializer()})
  toDate: Date;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  fromDate: Date;

  @field({
    mock: () => helpers.randomize([
      'Wanna have weekend',
      'Going to party',
      'I need a vacation'
    ])
  })
  comment: string;

  @field({mock: () => helpers.randomize([BreakReasons.dayoff, BreakReasons.disease, BreakReasons.vacation])})
  reason: BreakReasons;

  @field({mock: () => helpers.randomize([BreakState.approved, BreakState.created, BreakState.decline])})
  state: BreakState;

  @field({mock: () => helpers.randomize([BreakState.approved, BreakState.created, BreakState.decline])})
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

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Break>(Break)),
    mock: {type: Break, length: 10}
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
