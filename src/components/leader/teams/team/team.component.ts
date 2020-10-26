import { Component } from '@angular/core';
import { UI } from '@junte/ui';
import { LocalUI } from '../../../../enums/local-ui';

@Component({
  selector: 'app-leader-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {

  ui = UI;
  localUi = LocalUI;

}
