import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserCard} from 'src/models/user';
import {Team} from 'src/models/team';

@Component({
  selector: 'app-team-list-issues-component',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})

export class TeamIssuesListComponent implements OnInit {

  user: UserCard;
  dueDate: Date;
  team: Team;
  opened: boolean;
  problems: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({team, dueDate, user, opened, problems}) =>
      [this.team, this.dueDate, this.user, this.opened, this.problems] =
        [team, dueDate, user, opened, problems]);
  }

  filtered(state: { opened?, problems? }) {
    this.router.navigate([state],
      {relativeTo: this.route});
  }
}
