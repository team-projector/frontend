import { addDays } from 'date-fns';
import { SearchFilter } from '@junte/ui';
import { ArraySerializer } from 'serialize-ts';
import { BonusesState } from 'src/components/bonuses/bonuses.component';
import { PenaltiesState } from 'src/components/penalties/penalties.component';
import { DEFAULT_PAGE_SIZE } from 'src/consts';
import { User, UserPosition } from 'src/models/user';
import { mocks, TimeAccuracy } from 'src/utils/mocks';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { faker } from '../utils/mocks';
import { Paging } from './paging';

@model({
  mocking: (salary: Salary) => {
    const from = faker.date.past(0);
    salary.periodFrom = from;
    salary.periodTo = addDays(from, mocks.random(3, 30));
    salary.chargedTime = mocks.time(40, 80, TimeAccuracy.minutes);
    salary.sum = mocks.money(10000, 30000);
    salary.bonus = mocks.money(1000, 3000);
    salary.penalty = mocks.money(100, 500);
    salary.taxes = mocks.money(100, 500);
    salary.total = salary.sum + salary.bonus - salary.penalty;
  }
})
export class Salary {

  @field({mock: () => faker.random.uuid()})
  id: string;

  @field({mock: () => faker.random.number()})
  hourRate: string;

  @field({mock: () => faker.random.number()})
  taxRate: string;

  @field({mock: UserPosition})
  position: UserPosition;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  createdAt: Date;

  @field({mock: () => faker.date.future(), serializer: new DateSerializer()})
  periodTo: Date;

  @field({mock: () => faker.date.future(), serializer: new DateSerializer()})
  periodFrom: Date;

  @field({mock: () => faker.random.number()})
  chargedTime: number;

  @field({mock: () => faker.random.number()})
  bonus: number;

  @field({mock: () => faker.random.number()})
  taxes: number;

  @field({mock: () => faker.random.number()})
  penalty: number;

  @field({mock: () => faker.random.number()})
  sum: number;

  @field({mock: () => faker.random.number()})
  total: number;

  @field({mock: () => faker.helpers.randomize([true, false])})
  payed: boolean;

}

@model()
export class PagingSalaries implements Paging<Salary> {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Salary>(Salary)),
    mock: {type: Salary, length: 10}
  })
  results: Salary[];
}

@model()
export class SalariesFilter implements SearchFilter {

  @field()
  user?: number;

  @field()
  first?: number;

  @field()
  offset?: number;

  constructor(defs: SalariesFilter = null) {
    Object.assign(this, defs || {offset: 0, first: DEFAULT_PAGE_SIZE});
  }

}

@model()
export class BonusesFilter {

  @field()
  user?: number;

  @field()
  salary?: number;

  orderBy?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  constructor(defs: BonusesFilter = null) {
    Object.assign(this, defs || {offset: 0, first: DEFAULT_PAGE_SIZE});
  }

}

@model()
export class Bonus {

  @field({mock: () => faker.random.number()})
  id: number;

  @field({mock: faker.date.future(), serializer: new DateSerializer()})
  createdAt: Date;

  @field({mock: User})
  createdBy: User;

  @field({mock: () => faker.random.number()})
  sum: number;

  @field()
  comment: string;
}

@model()
export class PenaltiesFilter {

  @field()
  user?: number;

  @field()
  salary?: number;

  orderBy?: string;

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  state?: PenaltiesState | null;

  constructor(defs: PenaltiesFilter = null) {
    Object.assign(this, defs || {offset: 0, first: DEFAULT_PAGE_SIZE});
  }

}

@model()
export class Penalty {

  @field({mock: () => faker.random.number()})
  id: number;

  @field({mock: faker.date.future(), serializer: new DateSerializer()})
  createdAt: Date;

  @field({mock: User})
  createdBy: User;

  @field({mock: () => faker.random.number()})
  sum: number;

  @field()
  comment: string;
}

@model()
export class PagingBonuses implements Paging<Bonus> {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Bonus>(Bonus)),
    mock: {type: Bonus, length: 10}
  })
  results: Bonus[];
}

@model()
export class PagingPenalties implements Paging<Penalty> {

  @field({mock: () => faker.random.number()})
  count: number;

  @field({
    name: 'edges',
    serializer: new ArraySerializer(new EdgesToPaging<Penalty>(Penalty)),
    mock: {type: Penalty, length: 10}
  })
  results: Penalty[];
}
