import {field, model} from '@junte/mocker-library';

@model()
export class Project {

  @field({mock: '{{id}}'})
  id: number;

  @field({mock: '{{project}}'})
  title: string;

  @field({mock: '{{project}}'})
  fullTitle: string;

  @field({
    name: 'gl_url',
    mock: '{{url}}'
  })
  glUrl: string;
}
