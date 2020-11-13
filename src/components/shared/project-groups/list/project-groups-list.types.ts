import { field, model } from 'src/decorators/model';
import { ProjectType } from 'src/models/enums/project';

export interface ProjectGroupsState {
  first: number;
  offset: number;
  type: ProjectType;
}

@model()
export class ProjectGroupsStateUpdate {

  @field()
  first: number;

  @field()
  offset: number;

  @field()
  type: ProjectType;

  constructor(defs: Partial<ProjectGroupsStateUpdate> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
