import { Component, HostBinding, Input } from '@angular/core';
import { UI } from '@junte/ui';
import { LocalUI } from 'src/enums/local-ui';
import { TeamMemberRole } from 'src/models/enums/team';
import { UserRole } from 'src/models/enums/user';
import { User } from 'src/models/user';
import { CardSize } from './user-card.types';

@Component({
  selector: 'app-user',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  ui = UI;
  localUi = LocalUI;
  cardSize = CardSize;
  teamMemberRole = TeamMemberRole;

  @HostBinding('attr.data-size')
  @Input()
  size: CardSize = CardSize.base;

  @Input()
  user: User;

  @Input()
  roles: UserRole[];

}
