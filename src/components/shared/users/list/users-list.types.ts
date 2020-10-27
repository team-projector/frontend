import { field, model } from '../../../../decorators/model';

export interface UsersState {
  first: number;
  offset: number;
}

@model()
export class UsersStateUpdate {

  @field()
  first: number;

  @field()
  offset: number;

  constructor(defs: Partial<UsersStateUpdate> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
