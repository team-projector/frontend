import { field, model } from 'src/decorators/model';
import { Team } from 'src/models/team';
import { User } from 'src/models/user';

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

  constructor(defs: Partial<BreaksStateUpdate> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
