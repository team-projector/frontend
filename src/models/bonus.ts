import { ArraySerializer } from '@junte/serialize-ts';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { LazyModel } from '../serializers/model';
import { faker, mocks } from '../utils/mocks';
import { ModelRef } from '../utils/types';
import { Paging } from './paging';
import { Salary } from './salary';
import { User } from './user';

@model()
export class Bonus {

  @field({mock: () => mocks.id()})
  id: number;

  @field({mock: () => faker.date.recent(200), serializer: new DateSerializer()})
  createdAt: Date;

  @field({mock: User})
  user: User;

  @field({mock: User})
  createdBy: User;

  @field({mock: () => mocks.random(30, 100)})
  sum: number;

  @field({
    mock: () => faker.helpers.randomize([
      $localize`:@@mocks.bonus_comment_overtime:Overtime`,
      $localize`:@@mocks.bonus_comment_great:Great code!`
    ])
  })
  comment: string;

  @field({serializer: new LazyModel(() => Salary)})
  salary: ModelRef<Salary>;
}

@model()
export class PagingBonuses implements Paging<Bonus> {

  @field({mock: () => mocks.random(7, 15)})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Bonus>(Bonus)),
    mock: {type: Bonus, length: 10}
  })
  results: Bonus[];
}

@model()
export class BonusesFilter {

  @field()
  user: string;

  @field()
  salary: string;

  @field()
  first: number;

  @field()
  offset: number;

  constructor(defs: Partial<BonusesFilter> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
