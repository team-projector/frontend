import { Component, Input, OnInit } from '@angular/core';
import { UI } from 'junte-ui';
import { interval, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { environment } from '../../environments/environment';
import { GitLabStatus } from '../../models/gitlab';
import { getMock } from '../../utils/mocks';
import { GitlabStatusGQL } from './gitlab-status.graphql';

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

  constructor(private gitlabStatusGQL: GitlabStatusGQL) {
  }

  ngOnInit() {
    this.load();
    interval(STATUS_TIMEOUT).subscribe(() => this.load());
  }

  load() {
    (environment.mocks ? of(getMock(GitLabStatus))
      : this.gitlabStatusGQL.fetch()
        .pipe(map(({data: {gitlabStatus}}) =>
          deserialize(gitlabStatus, GitLabStatus))))
      .subscribe(status => this.status = status);
  }
}
