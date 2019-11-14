import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeExpensesState } from 'src/models/spent-time';
import { User } from 'src/models/user';

@Component({
  selector: 'app-issues-epxenses-time-list',
  templateUrl: './time-expenses-list.component.html',
  styleUrls: ['./time-expenses-list.component.scss']
})
export class TimeExpensesListComponent implements OnInit {

  user: User;
  dueDate: Date;
  state: TimeExpensesState;

  @Output() reloaded = new EventEmitter();

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({user, dueDate, state}) =>
      [this.user, this.dueDate, this.state] = [user, dueDate, state]);
  }

  filtered(filtered: { state? }) {
    this.router.navigate([filtered],
      {relativeTo: this.route});
  }

}
