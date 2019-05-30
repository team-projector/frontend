import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserCard } from 'src/models/user';

@Component({
  selector: 'app-team-list-issues-component',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})

export class TeamIssuesListComponent implements OnInit {

  user: UserCard;
  dueDate: Date;
  team: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(({team, dueDate, user}) =>
      [this.team, this.dueDate, this.user] = [team, dueDate, user]);
  }
}
