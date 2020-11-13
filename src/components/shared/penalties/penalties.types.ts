import { field, model } from 'src/decorators/model';
import { Salary } from 'src/models/salary';
import { User } from 'src/models/user';

export interface PenaltiesState {
  first: number;
  offset: number;
  user: User;
  salary: Salary;
}

@model()
export class PenaltiesStateUpdate {

  @field()
  first?: number;

  @field()
  offset?: number;

  @field()
  user?: string;

  @field()
  salary?: string;

  constructor(defs: Partial<PenaltiesStateUpdate> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
