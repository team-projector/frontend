import { Component } from '@angular/core';
import { UI } from '@esanum/ui';
import { LocalUI } from 'src/enums/local-ui';

@Component({
  selector: 'app-team-breaks',
  templateUrl: './team-breaks.component.html',
  styleUrls: ['./team-breaks.component.scss']
})
export class TeamBreaksComponent {

  ui = UI;
  localUi = LocalUI;

}
