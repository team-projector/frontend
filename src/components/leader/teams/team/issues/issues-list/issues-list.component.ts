import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/models/user';
import {Team} from 'src/models/team';
import {UI} from 'junte-ui';
import {ArraySerializer, deserialize, ModelSerializer, serialize} from 'serialize-ts';
import {Project} from '../../../../../../models/project';

@Component({
  selector: 'app-team-list-issues-component',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})

export class TeamIssuesListComponent implements OnInit {

  ui = UI;

  team: Team;
  user: User;
  project: Project;
  dueDate: Date;

  opened: boolean;
  problems: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({team, user, project, dueDate, opened, problems}) =>
      [this.team, this.user, this.project, this.dueDate, this.opened, this.problems] =
        [team, user, project, dueDate, opened, problems]);
  }

  filtered(state: { opened?, problems? }) {
    this.router.navigate([state],
      {relativeTo: this.route});
  }
}
