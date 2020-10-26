import { DATE_FORMAT } from '../../../../consts';
import { field, model } from '../../../../decorators/model';
import { IssuesType } from '../../../../models/enums/issue';
import { Project } from '../../../../models/project';
import { Team } from '../../../../models/team';
import { User } from '../../../../models/user';
import { DateSerializer } from '../../../../serializers/date';

export interface IssuesState {
  first: number;
  offset: number;
  q: string;
  type: IssuesType;
  dueDate: Date;
  user: User;
  team: Team;
  developer: User;
  project: Project;
}

@model()
export class IssuesStateUpdate {

  @field()
  q: string;

  @field()
  first: number;

  @field()
  offset: number;

  @field()
  type: IssuesType;

  @field({serializer: new DateSerializer(DATE_FORMAT)})
  dueDate: Date;

  @field()
  project: string;

  @field()
  developer: string;

  constructor(defs: Partial<IssuesStateUpdate> = null) {
    if (!!defs) {
      Object.assign(this, defs);
    }
  }
}
