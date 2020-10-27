import { field, model } from '../../../../decorators/model';
import { ProjectType } from '../../../../models/enums/project';

export interface ProjectsState {
  first: number;
  offset: number;
  type: ProjectType;
}

@model()
export class ProjectsStateUpdate {

  @field()
  first: number;

  @field()
  offset: number;

  @field()
  type: ProjectType;

  constructor(defs: Partial<ProjectsStateUpdate> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
