import { addDays } from 'date-fns';
import { SearchFilter } from '@junte/ui';
import { ArraySerializer } from 'serialize-ts';
import { User, UserPosition } from 'src/models/user';
import { mocks, TimeAccuracy } from 'src/utils/mocks';
import { field, model } from '../decorators/model';
import { DateSerializer } from '../serializers/date';
import { EdgesToPaging } from '../serializers/graphql';
import { faker } from '../utils/mocks';
import { Paging } from './paging';

@model({
  mocking: (salary: Salary) => {
    const from = faker.date.past(150);
    salary.periodFrom = from;
    salary.periodTo = addDays(from, mocks.random(3, 30));
    salary.chargedTime = mocks.time(40, 80, TimeAccuracy.minutes);
    salary.sum = mocks.money(400, 1000);
    salary.bonus = mocks.money(70, 120);
    salary.penalty = mocks.money(70, 120);
    salary.taxes = mocks.money(100, 200);
    salary.total = salary.sum + salary.bonus - salary.penalty;
  }
})
export class Salary {

  @field({mock: context => context?.id || faker.random.uuid()})
  id: string;

  @field({mock: () => mocks.random(5, 15)})
  hourRate: string;

  @field({mock: () => faker.random.number()})
  taxRate: string;

  @field({mock: UserPosition})
  position: UserPosition;

  @field({mock: () => faker.date.past(), serializer: new DateSerializer()})
  createdAt: Date;

  @field({serializer: new DateSerializer()})
  periodTo: Date;

  @field({serializer: new DateSerializer()})
  periodFrom: Date;

  @field()
  chargedTime: number;

  @field()
  bonus: number;

  @field()
  taxes: number;

  @field()
  penalty: number;

  @field()
  sum: number;

  @field()
  total: number;

  @field({mock: () => faker.helpers.randomize([true, false])})
  payed: boolean;

  @field({mock: User})
  user: User;

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
  first: number;

  @field()
  offset: number;

  @field()
  user: string;

  constructor(defs: Partial<SalariesFilter> = null) {
    Object.assign(this, defs);
  }

}

