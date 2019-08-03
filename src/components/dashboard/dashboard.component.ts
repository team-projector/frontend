import { Component, Inject, ViewChild } from '@angular/core';
import { UI } from 'junte-ui';
import { MeManager } from '../../managers/me.manager';
import { Router } from '@angular/router';
import { UserRole } from '../../models/user';
import { AppConfig } from '../../app-config';
import { GitlabStatusComponent } from '../gitlab-status/gitlab-status.component';


enum Themes {
  light = 'light',
  dark = 'dark'
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  ui = UI;
  userRole = UserRole;
  private _theme = Themes.light;

  themes = Themes;

  set theme(theme: Themes) {
    this._theme = theme;
    this.load(theme);
  }

  get theme() {
    return this._theme;
  }

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

  private load(theme: Themes) {
    window['themes'](theme);
  }

}
