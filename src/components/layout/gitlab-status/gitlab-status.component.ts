import { Component, Input, OnInit } from '@angular/core';
import { UI } from '@junte/ui';
import { interval, of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { deserialize } from '@junte/serialize-ts';
import { DFNS_LOCALE, FIRST_DAY_OF_WEEK } from 'src/consts';
import { environment } from 'src/environments/environment';
import { GitLabStatus } from 'src/models/gitlab';
import { getMock } from '@junte/mocker';
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

  progress = {loading: false};

  constructor(private gitlabStatusGQL: GitlabStatusGQL) {
  }

  ngOnInit() {
    this.load();
    interval(STATUS_TIMEOUT).subscribe(() => this.load());
  }

  load() {
    this.progress.loading = true;
    (environment.mocks ? of(getMock(GitLabStatus))
      : this.gitlabStatusGQL.fetch()
        .pipe(map(({data: {gitlabStatus}}) =>
          deserialize(gitlabStatus, GitLabStatus))))
      .pipe(finalize(() => this.progress.loading = false))
      .subscribe(status => this.status = status);
  }
}
