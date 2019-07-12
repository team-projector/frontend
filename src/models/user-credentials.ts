import { field, model } from '@junte/mocker-library';

@model()
export class UserCredentials {

  @field({mock: '{{login}}'})
  login: string;

  @field({mock: '{{password}}'})
  password: string;

  constructor(defs: UserCredentials = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }

}
