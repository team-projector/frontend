import { field, model } from '@junte/mocker-library';

@model()
export class ProjectCard {

  @field({mock: '{{id}}'})
  id: number;

  @field({mock: '{{project}}'})
  title: string;

  @field({
    name: 'gl_url',
    mock: '{{url}}'
  })
  glUrl: string;
}

@model()
export class Project {

  @field({mock: '{{id}}'})
  id: number;

  @field({mock: '{{project}}'})
  title: string;

  @field({
    name: 'gl_url',
    mock: '{{url}}'
  })
  glUrl: string;
}

@model()
export class ProjectGroupCard {

  @field({mock: '{{id}}'})
  id: number;

  @field({mock: '{{project}}'})
  title: string;

  @field({
    name: 'gl_url',
    mock: '{{url}}'
  })
  glUrl: string;

}

@model()
export class ProjectGroup {

  @field({mock: '{{int 1 1000}}'})
  id: number;

  @field({mock: '{{project}}'})
  title: string;

  @field({
    name: 'gl_url',
    mock: '{{url}}'
  })
  glUrl: string;

}
