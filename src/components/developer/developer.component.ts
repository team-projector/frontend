import { Component } from '@angular/core';
import { UI } from '@junte/ui';
import { LocalUI } from '../../enums/local-ui';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})

export class DeveloperComponent {

  ui = UI;
  localUi = LocalUI;

}
