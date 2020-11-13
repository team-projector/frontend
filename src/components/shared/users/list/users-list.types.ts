import { field, model } from 'src/decorators/model';

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
