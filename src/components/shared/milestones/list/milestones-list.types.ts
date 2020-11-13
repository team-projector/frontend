import { field, model } from 'src/decorators/model';
import { MilestoneType } from 'src/models/enums/milestone';


export interface MilestonesState {
  first: number;
  offset: number;
  q: string;
  type: MilestoneType;
}

@model()
export class MilestonesStateUpdate {

  @field()
  q: string;

  @field()
  first: number;

  @field()
  offset: number;

  @field()
  type: MilestoneType;

  constructor(defs: Partial<MilestonesStateUpdate> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
