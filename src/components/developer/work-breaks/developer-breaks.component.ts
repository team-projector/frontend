import { Component } from '@angular/core';
import { UI } from '@junte/ui';
import { LocalUI } from '../../../enums/local-ui';

@Component({
  selector: 'app-developer-breaks',
  templateUrl: './developer-breaks.component.html',
  styleUrls: ['./developer-breaks.component.scss']
})
export class DeveloperBreaksComponent {

  ui = UI;
  localUi = LocalUI;

}
