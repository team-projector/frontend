import { field, model } from '../../../decorators/model';

@model()
export class TeamsState {

  @field()
  first?: number;

  @field()
  offset?: number;

  constructor(defs: TeamsState = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
