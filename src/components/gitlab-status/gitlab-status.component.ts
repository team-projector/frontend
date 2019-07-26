import { Component, Input, OnInit } from '@angular/core';
import { GitLabStatus } from '../../models/gitlab';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { interval } from 'rxjs';
import { GitlabStatusGQL } from '../dashboard/gitlab-status.graphql';
import { UI } from 'junte-ui';

const STATUS_TIMEOUT = 60000;

@Component({
  selector: 'app-gitlab-status',
  templateUrl: './gitlab-status.component.html',
  styleUrls: ['./gitlab-status.component.scss']
})

export class GitlabStatusComponent implements OnInit {

  ui = UI;

  @Input()
  status: GitLabStatus;

  constructor(private gitlabStatusApollo: GitlabStatusGQL) {
  }

  ngOnInit() {
    this.load();
    interval(STATUS_TIMEOUT).subscribe(() => this.load());
  }

  load() {
    this.gitlabStatusApollo.fetch()
      .pipe(map(({data: {gitlabStatus}}) =>
        deserialize(gitlabStatus, GitLabStatus)))
      .subscribe(status => this.status = status);
  }
}
