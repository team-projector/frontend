import { field, model } from '../decorators/model';
import { EdgesToArray } from '../serializers/graphql';
import { Milestone } from './milestone';

@model()
export class ProjectGroup {

  @field({mock: ''})
  id: string;

  @field({mock: ''})
  title: string;

  @field({mock: ''})
  fullTitle: string;

  @field({mock: ''})
  glUrl: string;

  @field()
  glAvatar: string;
}

@model()
export class Project {

  @field({mock: ''})
  id: string;

  @field({mock: ''})
  title: string;

  @field({mock: ''})
  fullTitle: string;

  @field()
  group: ProjectGroup;

  @field({
    name: 'gl_url',
    mock: ''
  })
  glUrl: string;

  @field({
    serializer: new EdgesToArray(Milestone),
    mock: ''
  })
  milestones: Milestone[];
}
