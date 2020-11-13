import { field, model } from 'src/decorators/model';
import { Salary } from 'src/models/salary';
import { User } from 'src/models/user';

export interface BonusesState {
  first: number;
  offset: number;
  user: User;
  salary: Salary;
}

@model()
export class BonusesStateUpdate {

  @field()
  first: number;

  @field()
  offset: number;

  constructor(defs: Partial<BonusesStateUpdate> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
