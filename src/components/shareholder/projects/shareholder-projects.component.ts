import { Component } from '@angular/core';
import { UI } from '@junte/ui';
import { LocalUI } from 'src/enums/local-ui';

@Component({
  selector: 'app-shareholder-projects',
  templateUrl: './shareholder-projects.component.html',
  styleUrls: ['./shareholder-projects.component.scss']
})
export class ShareholderProjectsComponent {

  ui = UI;
  localUi = LocalUI;

}
