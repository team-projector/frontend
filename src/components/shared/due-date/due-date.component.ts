import { Component, Input } from '@angular/core';
import { UI } from '@junte/ui';
import { startOfDay } from 'date-fns';
import { DFNS_LOCALE } from 'src/consts';
import { IssueProblem } from 'src/models/enums/issue';

@Component({
  selector: 'app-due-date',
  templateUrl: './due-date.component.html',
  styleUrls: ['./due-date.component.scss']
})

export class DueDateComponent {

  ui = UI;
  issueProblem = IssueProblem;
  today = startOfDay(new Date());
  dfnsOptions: any = {locale: DFNS_LOCALE, unit: 'day'};

  @Input()
  dueDate: Date;

  @Input()
  problems: IssueProblem[] = [];

}
