import { field, model } from 'src/decorators/model';

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

@model()
export class TeamsStateUpdate {

  @field()
  first?: number;

  @field()
  offset?: number;

  constructor(defs: TeamsStateUpdate = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
