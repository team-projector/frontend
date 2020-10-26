import { field, model } from '../../../../decorators/model';
import { User } from '../../../../models/user';

export interface SalariesState {
  first: number;
  offset: number;
  user: User;
}

@model()
export class SalariesStateUpdate {

  @field()
  first: number;

  @field()
  offset: number;

  constructor(defs: Partial<SalariesStateUpdate> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
