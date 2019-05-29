import { ArraySerializer, Field, Model, ModelSerializer, Type } from 'serialize-ts';
import { MockClass, MockFieldNested } from '../decorators/mock';
import { DateSerializer } from '../serializers/date';
import { DATE_FORMAT } from '../consts';
import { MetricsGroup, UserProgressMetrics } from './user-progress-metrics';

@Model()
@MockClass()
export class TeamProgressMetrics {

  @Field()
  @MockFieldNested('{{int 1 10}}')
  user: number;

  @Field()
  @Field()
  @Type(new ArraySerializer(new ModelSerializer(UserProgressMetrics)))
  @MockFieldNested('[{{#repeat 5 15}} {{> team_member_card }} {{/repeat}}]')
  metrics: UserProgressMetrics[];
}

@Model()
export class TeamMetricsFilter {

  @Field()
  @Type(new DateSerializer(DATE_FORMAT))
  start?: Date;

  @Field()
  @Type(new DateSerializer(DATE_FORMAT))
  end?: Date;

  @Field()
  group?: MetricsGroup;

  constructor(defs: TeamMetricsFilter = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
