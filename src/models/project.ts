import {field, model} from '@junte/mocker-library';

@model()
export class Project {

  @field({mock: '{{id}}'})
  id: string;

  @field({mock: '{{project}}'})
  title: string;

  @field({mock: '{{title}}'})
  fullTitle: string;

  @field({
    name: 'gl_url',
    mock: '{{url}}'
  })
  glUrl: string;
}

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
}

