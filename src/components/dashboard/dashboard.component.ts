import { Component, Inject, ViewChild } from '@angular/core';
import { UI } from 'junte-ui';
import { MeManager } from '../../managers/me.manager';
import { Router } from '@angular/router';
import { UserRole } from '../../models/user';
import { AppConfig } from '../../app-config';
import { GitlabStatusComponent } from '../gitlab-status/gitlab-status.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  ui = UI;
  userRole = UserRole;

  loading: { [name: string]: boolean } = {};

  @ViewChild(GitlabStatusComponent)
  gitlabStatus: GitlabStatusComponent;

  constructor(@Inject(AppConfig) public config: AppConfig,
              private router: Router,
              public me: MeManager) {
  }

  logout() {
    this.router.navigate(['/signup/login'])
      .then(() => this.config.token = null);
  }

  setTheme(theme: string = null) {
    this.loading[theme] = true;
    window['themes'](theme, () => this.loading[theme] = false);
  }

}
