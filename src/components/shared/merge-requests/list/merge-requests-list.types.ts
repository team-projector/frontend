import { field, model } from 'src/decorators/model';
import { MergeRequestType } from 'src/models/enums/merge-requests';
import { Team } from 'src/models/team';
import { User } from 'src/models/user';

export interface MergeRequestsState {
  first: number;
  offset: number;
  type: MergeRequestType;
  user: User;
  team: Team;
}

@model()
export class MergeRequestsStateUpdate {

  @field()
  first: number;

  @field()
  offset: number;

  @field()
  type: MergeRequestType;

  @field()
  user: string;

  @field()
  team: string;

  constructor(defs: Partial<MergeRequestsStateUpdate> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
