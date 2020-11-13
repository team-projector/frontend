import { DATE_FORMAT } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { TimeExpenseType } from 'src/models/enums/time-expenses';
import { Salary } from 'src/models/salary';
import { Team } from 'src/models/team';
import { User } from 'src/models/user';
import { DateSerializer } from 'src/serializers/date';

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

  constructor(defs: Partial<TimeExpensesStateUpdate> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
