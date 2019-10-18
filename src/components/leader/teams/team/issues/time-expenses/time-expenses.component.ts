import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/models/team';
import { User } from 'src/models/user';

@Component({
  selector: 'app-team-time-expenses-component',
  templateUrl: './time-expenses.component.html',
  styleUrls: ['./time-expenses.component.scss']
})

export class TeamTimeExpensesListComponent implements OnInit {

  team: Team;
  user: User;
  dueDate: Date;

  @Output() reloaded = new EventEmitter();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({team, user, dueDate}) =>
      [this.team, this.user, this.dueDate] = [team, user, dueDate]);
  }

}
