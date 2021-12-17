import { Component } from '@angular/core';
import { UI } from '@esanum/ui';
import { LocalUI } from 'src/enums/local-ui';

@Component({
  selector: 'app-developer-issues',
  templateUrl: './developer-issues.component.html',
  styleUrls: ['./developer-issues.component.scss']
})
export class DeveloperIssuesComponent {

  ui = UI;
  localUi = LocalUI;

}
