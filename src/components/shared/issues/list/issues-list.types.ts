import { DATE_FORMAT } from 'src/consts';
import { field, model } from 'src/decorators/model';
import { IssuesType } from 'src/models/enums/issue';
import { Project } from 'src/models/project';
import { Team } from 'src/models/team';
import { User } from 'src/models/user';
import { DateSerializer } from 'src/serializers/date';

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
