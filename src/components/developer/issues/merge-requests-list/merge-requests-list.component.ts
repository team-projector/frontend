import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from 'junte-ui';
import { MergeRequestState } from 'src/models/merge-request';
import { Project } from 'src/models/project';
import { User } from 'src/models/user';

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

  @Output() reloaded = new EventEmitter();

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
