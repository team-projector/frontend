import { Component, Input, OnInit } from '@angular/core';
import { getDay, startOfDay } from 'date-fns';
import { UI } from 'junte-ui';

@Component({
  selector: 'app-due-date',
  templateUrl: './due-date.component.html',
  styleUrls: ['./due-date.component.html']
})

export class DueDateComponent implements OnInit {

  ui = UI;
  today = startOfDay(new Date());
  getDay = getDay;

  @Input()
  dueDate: number;

  constructor() {
  }

  ngOnInit() {
  }
}
