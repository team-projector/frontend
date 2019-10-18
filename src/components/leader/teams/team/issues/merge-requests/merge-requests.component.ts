import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from 'junte-ui';
import { Team } from 'src/models/team';
import { User } from 'src/models/user';
import { MergeRequestState } from 'src/models/merge-request';
import { Project } from 'src/models/project';

@Component({
  selector: 'app-team-merge-requests-list',
  templateUrl: './merge-requests.component.html',
  styleUrls: ['./merge-requests.component.scss']
})

export class TeamMergeRequestsListComponent implements OnInit {

  ui = UI;

  team: Team;
  user: User;
  project: Project;
  state: MergeRequestState;

  @Output() reloaded = new EventEmitter();

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({team, user, project, state}) =>
      [this.team, this.user, this.project, this.state] =
        [team, user, project, state]);
  }

  filtered(filtered: { state? }) {
    this.router.navigate([filtered],
      {relativeTo: this.route});
  }
}
