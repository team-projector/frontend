import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCard } from 'src/models/user';
import { Team } from 'src/models/team';

@Component({
  selector: 'app-team-list-problems-component',
  templateUrl: './problems-list.component.html',
  styleUrls: ['./problems-list.component.scss']
})

export class TeamProblemsListComponent implements OnInit {

  team: Team;
  user: UserCard;
  dueDate: Date;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({team, dueDate, user}) =>
      [this.team, this.dueDate, this.user] = [team, dueDate, user]);
  }

}
