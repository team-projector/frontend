import {field, model} from '@junte/mocker-library';
import {EdgesToArray} from '../serializers/graphql';
import {Milestone} from './milestone';

@model()
export class ProjectGroup {

  @field({mock: '{{int 1 1000}}'})
  id: string;

  @field({mock: '{{project}}'})
  title: string;

  @field({mock: '{{title}}'})
  fullTitle: string;

  @field({mock: '{{url}}'})
  glUrl: string;

  @field()
  glAvatar: string;
}


@model()
export class Project {

  @field({mock: '{{id}}'})
  id: string;

  @field({mock: '{{project}}'})
  title: string;

  @field({mock: '{{title}}'})
  fullTitle: string;

  @field()
  group: ProjectGroup;

  @field({
    name: 'gl_url',
    mock: '{{url}}'
  })
  glUrl: string;

  @field({
    serializer: new EdgesToArray(Milestone),
    mock: '[{{#repeat 2 5}} {{> milestone}} {{/repeat}}]'
  })
  milestones: Milestone[];
}
