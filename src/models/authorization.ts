import { field, model } from '@junte/mocker-library';

@model()
export class AccessToken {
  @field()
  key: string;

  @field()
  created: string;
}
