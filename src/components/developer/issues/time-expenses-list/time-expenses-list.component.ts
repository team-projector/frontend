import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-issues-epxenses-time-list',
  templateUrl: './time-expenses-list.component.html',
  styleUrls: ['./time-expenses-list.component.scss']
})
export class TimeExpensesListComponent implements OnInit {

  user: User;
  dueDate: Date;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({user, dueDate}) =>
      [this.user, this.dueDate] = [user, dueDate]);
  }

}
