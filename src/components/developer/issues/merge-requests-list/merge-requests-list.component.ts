import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user';
import { UI } from 'junte-ui';
import { ArraySerializer, deserialize, ModelSerializer, serialize } from 'serialize-ts';
import { Project } from 'src/models/project';
import { MergeRequestState } from 'src/models/merge-request';

@Component({
  selector: 'app-developer-merge-requests-list',
  templateUrl: './merge-requests-list.component.html',
  styleUrls: ['./merge-requests-list.component.scss']
})

export class DeveloperMergeRequestsListComponent implements OnInit {

  ui = UI;

  user: User;
  project: Project;
  state: MergeRequestState;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({user, project, state}) =>
      [this.user, this.project, this.state] =
        [user, project, state]);
  }

  filtered(filtered: { state? }) {
    this.router.navigate([filtered],
      {relativeTo: this.route});
  }
}
