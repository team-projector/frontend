import { subDays } from 'date-fns';
import { faker } from '../utils/mocks';
import { SearchFilter } from '@junte/ui';
import { ArraySerializer } from 'serialize-ts';
import { BreakReasons, ApproveStates } from 'src/models/enums/break';
import { DATE_FORMAT} from '../consts';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { mocks } from '../utils/mocks';
import { Paging } from './paging';
import { User } from './user';
import { ModelRef } from '../utils/types';
import { LazyModel } from '../serializers/model';

@model({
  mocking: (workBreak: WorkBreak) => {
    [workBreak.fromDate, workBreak.toDate] = mocks.date.interval();
    const approvedAt = subDays(workBreak.fromDate, faker.random.number({min: 1, max: 10}));
    switch (faker.random.number({min: 1, max: 3})) {
      case 2:
        workBreak.approveState = ApproveStates.approved;
        workBreak.approvedAt = approvedAt;
        break;
      case 3:
        workBreak.approveState = ApproveStates.declined;
        workBreak.approvedAt = approvedAt;
        workBreak.declineReason = faker.helpers.randomize([
          $localize`:@@mocks.decline_urgent:Sorry we have an urgent project`,
          $localize`:@@mocks.decline_meetup:You need to be on next week meetup`,
          $localize`:@@mocks.decline_next_week:Only next week`
        ]);
        break;
      default:
        workBreak.approveState = ApproveStates.created;
    }
  }
})
export class WorkBreak {

  @field({mock: context => context?.id || faker.random.uuid()})
  id: number;

  @field({
    serializer: new LazyModel(() => User),
    mock: () => User
  })
  user: ModelRef<User>;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  createdAt: Date;

  @field({mock: () => faker.date.recent(-90), serializer: new DateSerializer(DATE_FORMAT)})
  toDate: Date;

  @field({mock: () => faker.date.recent(90), serializer: new DateSerializer(DATE_FORMAT)})
  fromDate: Date;

  @field({
    mock: () => faker.helpers.randomize([
      $localize`:@@mocks.break_comment_weekend:Wanna have weekend`,
      $localize`:@@mocks.break_comment_party:Going to party`,
      $localize`:@@mocks.break_comment_vacation:I need a vacation`
    ])
  })
  comment: string;

  @field()
  approveState: ApproveStates;

  @field()
  paidDays: number;

  @field()
  paid: boolean;

  @field({serializer: new DateSerializer()})
  approvedAt: Date;

  @field({
    serializer: new LazyModel(() => User),
    mock: () => User
  })
  approvedBy: ModelRef<User>;

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

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  fromDate: Date;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  toDate: Date;

  @field()
  reason: BreakReasons;

  @field()
  comment: string;

  @field()
  paidDays: number;

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
export class PagingBreaks implements Paging<WorkBreak> {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<WorkBreak>(WorkBreak)),
    mock: {type: WorkBreak, length: 10}
  })
  results: WorkBreak[];

}

@model()
export class BreaksFilter implements SearchFilter {

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  team?: string;

  @field()
  user?: string;

  constructor(defs: Partial<BreaksFilter> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
