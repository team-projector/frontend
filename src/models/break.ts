import { subDays } from 'date-fns';
import * as faker from 'faker';
import { SearchFilter } from 'junte-ui';
import { ArraySerializer } from 'serialize-ts';
import { BreakReasons, ApproveStates } from 'src/models/enums/break';
import { DATE_TIME_FORMAT } from '../consts';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { getMock, mocks } from '../utils/mocks';
import { Paging } from './paging';
import { User } from './user';

@model({
  mocking: (workBreak: Break) => {
    [workBreak.fromDate, workBreak.toDate] = mocks.date.interval();
    const approvedAt = subDays(workBreak.fromDate, faker.random.number({min: 1, max: 10}));
    switch (faker.random.number({min: 1, max: 3})) {
      case 2:
        workBreak.approveState = ApproveStates.approved;
        workBreak.approvedBy = getMock(User);
        workBreak.approvedAt = approvedAt;
        break;
      case 3:
        workBreak.approveState = ApproveStates.decline;
        workBreak.approvedBy = getMock(User);
        workBreak.approvedAt = approvedAt;
        workBreak.declineReason = faker.helpers.randomize([
          'Sorry we have an urgent project',
          'You need to be on next week meetup',
          'Only next week'
        ]);
        break;
      default:
        workBreak.approveState = ApproveStates.created;
    }
  }
})
export class Break {

  @field({mock: () => faker.random.uuid()})
  id: number;

  @field({mock: User})
  user: User;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  createdAt: Date;

  @field({serializer: new DateSerializer()})
  toDate: Date;

  @field({serializer: new DateSerializer()})
  fromDate: Date;

  @field({
    mock: () => faker.helpers.randomize([
      'Wanna have weekend',
      'Going to party',
      'I need a vacation'
    ])
  })
  comment: string;

  @field()
  approveState: ApproveStates;

  @field({serializer: new DateSerializer()})
  approvedAt: Date;

  @field()
  approvedBy: User;

  @field({
    mock: () => faker.helpers.randomize([
      BreakReasons.dayoff,
      BreakReasons.disease,
      BreakReasons.vacation])
  })
  reason: BreakReasons;

  @field()
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
