import {ArraySerializer, ModelSerializer} from 'serialize-ts';
import {DateSerializer} from '../../serializers/date';
import {DATE_FORMAT} from '../../consts';
import {field, model} from '@junte/mocker-library';
import {UserProgressMetrics} from './user-progress-metrics';
import {MetricsGroup} from './user-progress-metrics';
import {User} from './user';

@model()
export class TeamProgressMetrics {

  @field({mock: '{{int 1 10}}'})
  user: User;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(UserProgressMetrics)),
    mock: '[{{#repeat 5 15}} {{> team_member }} {{/repeat}}]'
  })
  metrics: UserProgressMetrics[];
}

@model()
export class TeamMetricsFilter {

  @field()
  team: number;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  start: Date;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  end: Date;

  @field()
  group: MetricsGroup;

  constructor(defs: TeamMetricsFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
