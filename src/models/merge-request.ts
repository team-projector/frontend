import {ArraySerializer, ModelSerializer} from 'serialize-ts';
import {field, model} from '@junte/mocker-library';
import {Label} from './label';
import {User} from './user';
import {Project} from './project';
import {EdgesToArray} from '../../serializers/graphql';

export enum MergeRequestState {
  opened = 'opened',
  closed = 'closed'
}

@model()
export class MergeRequest {

  @field({mock: '{{id}}'})
  id: number;

  @field({mock: '{{issue}}'})
  title: string;

  @field({
    serializer: new EdgesToArray(Label),
    mock: '[{{#repeat 2 5}} {{> label}} {{/repeat}}]'
  })
  labels: Label[];

  @field({mock: '{{> object_link presentation=(project)}}'})
  project: Project;

  @field({mock: '{{int 10 100}}'})
  timeEstimate: number;

  @field({mock: '{{int 10 100}}'})
  timeSpent: number;

  @field({mock: '{{int 10 100}}'})
  totalTimeSpent: number;

  @field({mock: '{{url}}'})
  glUrl: string;

  @field({mock: MergeRequestState.opened})
  state: MergeRequestState;

  @field({mock: '{{> user}}'})
  user: User;
}
