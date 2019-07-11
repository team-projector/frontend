import { ArraySerializer, DateSerializer, ModelSerializer } from 'serialize-ts';
import { DATE_FORMAT } from '../consts';
import { MetricsGroup, UserProgressMetrics } from './user-progress-metrics';
import { field, model } from '@junte/mocker-library';

@model()
export class TeamProgressMetrics {

  @field({mock: '{{int 1 10}}'})
  user: number;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(UserProgressMetrics)),
    mock: '[{{#repeat 5 15}} {{> team_member }} {{/repeat}}]'
  })
  metrics: UserProgressMetrics[];
}

@model()
export class TeamMetricsFilter {

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  start?: Date;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  end?: Date;

  @field()
  group?: MetricsGroup;

  constructor(defs: TeamMetricsFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
