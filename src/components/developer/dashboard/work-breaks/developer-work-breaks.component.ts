import { Component, Input } from '@angular/core';
import { UI } from '@junte/ui';
import { Me } from 'src/models/user';

@Component({
  selector: 'app-developer-work-breaks',
  templateUrl: './developer-work-breaks.component.html',
  styleUrls: ['./developer-work-breaks.component.scss']
})
export class DeveloperWorkBreaksComponent {

  ui = UI;

  @Input()
  me: Me;

  daysMapping = {
    '=1': 'day',
    'other': 'days'
  };
}
