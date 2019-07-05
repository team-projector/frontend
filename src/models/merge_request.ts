import { ArraySerializer, ModelSerializer } from 'serialize-ts';
import { ObjectLink } from './object-link';
import { LabelCard } from './label';
import { UserCard } from './user';
import { field, model } from '@junte/mocker-library';

export enum MergeRequestState {
  opened = 'opened',
  closed = 'closed'
}

@model()
export class MergeRequestCard {

  @field({
    mock: '{{id}}'
  })
  id: number;

  @field({
    mock: '{{issue}}'
  })
  title: string;

  @field({
    serializer: new ArraySerializer(new ModelSerializer(LabelCard)),
    mock: '[{{#repeat 2 5}} {{> label_card}} {{/repeat}}]'
  })
  labels: LabelCard[];

  @field({
    mock: '{{> object_link presentation=(project)}}'
  })
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

  @field({
    mock: MergeRequestState.opened
  })
  state: MergeRequestState;

  @field({
    mock: '{{> user_card}}'
  })
  user: UserCard;
}
