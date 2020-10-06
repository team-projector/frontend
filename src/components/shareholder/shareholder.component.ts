import { Component } from '@angular/core';
import { UI } from '@junte/ui';
import { LocalUI } from '../../enums/local-ui';

@Component({
  selector: 'app-shareholder',
  templateUrl: './shareholder.component.html',
  styleUrls: ['./shareholder.component.scss']
})

export class ShareholderComponent {

  ui = UI;
  localUi = LocalUI;

}
