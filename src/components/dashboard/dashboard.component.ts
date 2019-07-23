import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { UI } from 'junte-ui';
import { MeManager } from '../../managers/me.manager';
import { Router } from '@angular/router';
import { GitLabStatus } from '../../models/gitlab';
import { UserRole } from '../../models/user';
import { deserialize } from 'serialize-ts/dist';
import { map } from 'rxjs/operators';
import { GitlabStatusGQL } from './gitlab-status.graphql';
import { interval } from 'rxjs';
import { AppConfig2 } from '../../app-config2';

const STATUS_TIMEOUT = 60000;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ui = UI;
  userRole = UserRole;
  status: GitLabStatus;

  loading: { [name: string]: boolean } = {};


  @ViewChild('status') statusEl: ElementRef;

  constructor(@Inject(AppConfig2) public config: AppConfig2,
              private router: Router,
              private gitlabStatusApollo: GitlabStatusGQL,
              public me: MeManager) {
  }

  logout() {
    // this.router.navigate(['/signup/login'])
    //   .then(() => this.config.token = null);
    this.config.token = null;
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

  setTheme(theme: string = null) {
    this.loading[theme] = true;
    window['themes'](theme, () => this.loading[theme] = false);
  }

}
