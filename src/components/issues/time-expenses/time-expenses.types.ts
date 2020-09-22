import { DATE_FORMAT } from '../../../consts';
import { field, model } from '../../../decorators/model';
import { TimeExpenseType } from '../../../models/enums/time-expenses';
import { Salary } from '../../../models/salary';
import { Team } from '../../../models/team';
import { User } from '../../../models/user';
import { DateSerializer } from '../../../serializers/date';

export interface TimeExpensesState {
  first: number;
  offset: number;
  type: TimeExpenseType;
  date: Date;
  team: Team;
  user: User;
  salary: Salary;
}

@model()
export class TimeExpensesStateUpdate {

  @field()
  first: number;

  @field()
  offset: number;

  @field()
  type: TimeExpenseType;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  date: Date;

  @field()
  team: string;

  @field()
  user: string;

  @field()
  salary: string;

  constructor(defs: Partial<TimeExpensesStateUpdate> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
