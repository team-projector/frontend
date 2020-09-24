import { field, model } from '../../../../decorators/model';
import { Salary } from '../../../../models/salary';
import { User } from '../../../../models/user';

export interface BonusesState {
  first: number;
  offset: number;
  user: User;
  salary: Salary;
}

@model()
export class BonusesStateUpdate {

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  user?: string;

  @field()
  salary?: string;

  constructor(defs: Partial<BonusesStateUpdate> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
