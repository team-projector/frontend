import { field, model } from '../../../../decorators/model';
import { Team } from '../../../../models/team';
import { User } from '../../../../models/user';

export interface BreaksState {
  first: number;
  offset: number;
  user: User;
  team: Team;
}

@model()
export class BreaksStateUpdate {

  @field()
  first: number;

  @field()
  offset: number;

  @field()
  user: string;

  @field()
  team: string;

  constructor(defs: Partial<BreaksStateUpdate> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
