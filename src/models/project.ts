import {field, model} from '@junte/mocker-library';

@model()
export class Project {

  @field({mock: '{{id}}'})
  id: string;

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

@model()
export class ProjectGroup {

  @field({mock: '{{int 1 1000}}'})
  id: string;

  @field({mock: '{{project}}'})
  title: string;

  @field({mock: '{{url}}'})
  glUrl: string;
}

@model()
export class ProjectIssuesSummary {

  @field()
  remains: number;

  @field()
  percentage: number;

  @field()
  openedCount: number;

}

@model()
export class ProjectSummary {

  @field()
  project: Project;

  @field()
  issues: ProjectIssuesSummary;

}
