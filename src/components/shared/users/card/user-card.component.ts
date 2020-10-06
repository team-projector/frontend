import { Component, HostBinding, Input } from '@angular/core';
import { UI } from '@junte/ui';
import { LocalUI } from '../../../../enums/local-ui';
import { UserRole } from '../../../../models/enums/user';
import { User } from '../../../../models/user';
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

  @HostBinding('attr.data-size')
  @Input()
  size: CardSize = CardSize.base;

  @Input()
  user: User;

  @Input()
  roles: UserRole[];

}
