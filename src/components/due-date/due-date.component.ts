import {Component, Input, OnInit} from '@angular/core';
import {getDay, isThisWeek} from 'date-fns';
import {UI} from 'junte-ui';

@Component({
  selector: 'app-due-date',
  templateUrl: './due-date.component.html',
  styleUrls: ['./due-date.component.scss']
})

export class DueDateComponent implements OnInit {

  ui = UI;
  getDay = getDay;
  isThisWeek = isThisWeek;

  @Input()
  dueDate: Date;

  constructor() {
  }

  ngOnInit() {
  }
}
