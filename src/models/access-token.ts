import { field, model } from '../decorators/model';

@model()
export class AccessToken {
  @field()
  key: string;

  @field()
  created: string;
}
