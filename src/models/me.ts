import { ArraySerializer, PrimitiveSerializer } from 'serialize-ts';
import { User, UserPermission } from './user';
import { field, model } from '@junte/mocker-library';

@model()
export class Me extends User {

  @field({
    serializer: new ArraySerializer(new PrimitiveSerializer()),
    mock: [UserPermission.inviteUser]
  })
  permissions: UserPermission[];

}
