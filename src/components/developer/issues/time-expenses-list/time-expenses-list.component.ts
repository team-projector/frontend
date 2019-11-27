import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-issues-epxenses-time-list',
  templateUrl: './time-expenses-list.component.html',
  styleUrls: ['./time-expenses-list.component.scss']
})
export class TimeExpensesListComponent {

  user: User;
  @Output() reloaded = new EventEmitter();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({user}) => this.user = user);
  }
}
