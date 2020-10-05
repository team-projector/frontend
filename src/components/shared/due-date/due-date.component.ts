import { Component, Input } from '@angular/core';
import { UI } from '@junte/ui';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-due-date',
  templateUrl: './due-date.component.html',
  styleUrls: ['./due-date.component.scss']
})

export class DueDateComponent {

  ui = UI;
  today = startOfDay(new Date());

  @Input()
  dueDate: Date;

}
