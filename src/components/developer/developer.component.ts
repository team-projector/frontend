import { Component } from '@angular/core';
import { UI } from '@junte/ui';
import { format, startOfDay } from 'date-fns';
import { DATE_FORMAT, DFNS_OPTIONS } from 'src/consts';
import { LocalUI } from 'src/enums/local-ui';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})

export class DeveloperComponent {

  ui = UI;
  localUi = LocalUI;
  today = format(startOfDay(new Date()), DATE_FORMAT, DFNS_OPTIONS);

}
