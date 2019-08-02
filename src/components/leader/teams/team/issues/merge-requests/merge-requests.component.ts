import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/models/user';
import {Team} from 'src/models/team';
import {UI} from 'junte-ui';
import {ArraySerializer, deserialize, ModelSerializer, serialize} from 'serialize-ts';
import {Project} from '../../../../../../models/project';
import {MergeRequestState} from '../../../../../../models/merge-request';

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
