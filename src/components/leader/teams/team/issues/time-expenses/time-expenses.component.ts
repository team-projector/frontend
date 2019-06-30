import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Team} from '../../../../../../models/team';
import {User} from '../../../../../../models/user';

@Component({
  selector: 'app-team-time-expenses-component',
  templateUrl: './time-expenses.component.html',
  styleUrls: ['./time-expenses.component.scss']
})

export class TeamTimeExpensesListComponent implements OnInit {

  team: Team;
  user: User;
  dueDate: Date;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({team, user, dueDate}) =>
      [this.team, this.user, this.dueDate] = [team, user, dueDate]);
  }

}
