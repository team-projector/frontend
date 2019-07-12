import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { ObjectLink } from './object-link';
import { field, model } from '@junte/mocker-library';
import { Label } from './label';
import { User } from './user';

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
    serializer: new ArraySerializer(new ModelSerializer(Label)),
    mock: '[{{#repeat 2 5}} {{> label}} {{/repeat}}]'
  })
  labels: Label[];

  @field({mock: '{{> object_link presentation=(project)}}'})
  project: ObjectLink;

  @field({
    name: 'time_estimate',
    mock: '{{int 10 100}}'
  })
  timeEstimate: number;

  @field({
    name: 'time_spent',
    mock: '{{int 10 100}}'
  })
  timeSpent: number;

  @field({
    name: 'total_time_spent',
    mock: '{{int 10 100}}'
  })
  totalTimeSpent: number;

  @field({
    name: 'gl_url',
    mock: '{{url}}'
  })
  glUrl: string;

  @field({mock: MergeRequestState.opened})
  state: MergeRequestState;

  @field({mock: '{{> user}}'})
  user: User;
}
