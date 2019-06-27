import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Team} from '../../../../../../models/team';

@Component({
  selector: 'app-team-time-expenses-component',
  templateUrl: './time-expenses.component.html',
  styleUrls: ['./time-expenses.component.scss']
})

export class TeamTimeExpensesListComponent implements OnInit {

  team: Team;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({team}) => this.team = team);
  }

}
