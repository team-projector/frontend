import { field, model } from '../../../../decorators/model';
import { TicketsTypes } from '../../../../models/enums/ticket';

@model()
export class MilestoneState {

  @field()
  ticket?: string;

  @field()
  type?: TicketsTypes;

  constructor(defs: Partial<MilestoneState> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}

@model()
export class MilestoneUpdateState {

  @field()
  ticket?: string;

  @field()
  type?: TicketsTypes;

  constructor(defs: Partial<MilestoneUpdateState> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
