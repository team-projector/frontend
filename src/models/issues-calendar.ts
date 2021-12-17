import {field, model} from '../decorators/model';
import {faker} from '../utils/mocks';
import {DateSerializer} from '../serializers/date';
import {DATE_FORMAT, DFNS_OPTIONS} from '../consts';
import {ArraySerializer, ModelSerializer} from '@junte/serialize-ts';
import {format} from 'date-fns';
import {UserProgressMetrics} from './user';
import {Issue} from './issue';

@model()
export class IssuesCalendarFilter {
  @field()
  user: string;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  start: Date;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  end: Date;

  constructor(defs: IssuesCalendarFilter) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@model()
export class IssuesCalendarDay {
  @field({
    mock: () => faker.date.recent(30),
    serializer: new DateSerializer(DATE_FORMAT)
  })
  date: Date;

  @field({mock: UserProgressMetrics})
  metrics: UserProgressMetrics;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(Issue)),
    mock: {type: Issue, length: 5}
  })
  issues: Issue[];

  getKey(): string {
    return format(this.date, DATE_FORMAT, DFNS_OPTIONS);
  }
}
