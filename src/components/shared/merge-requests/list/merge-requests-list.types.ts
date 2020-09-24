import { field, model } from '../../../../decorators/model';
import { MergeRequestType } from '../../../../models/enums/merge-requests';
import { Team } from '../../../../models/team';
import { User } from '../../../../models/user';

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
