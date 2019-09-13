import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UI } from 'junte-ui';
import { AppConfig } from '../../app-config';
import { MeManager } from '../../managers/me.manager';
import { UserRole } from '../../models/user';
import { GitlabStatusComponent } from '../gitlab-status/gitlab-status.component';
import { APPLICATION_READY } from '../../consts';


enum Themes {
  light = 'light',
  dark = 'dark'
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ui = UI;
  userRole = UserRole;
  themes = Themes;
  themeControl = new FormControl(Themes[localStorage.getItem('theme')]);

  themeForm = this.fb.group({
    theme: this.themeControl
  });

  @ViewChild(GitlabStatusComponent, {static: false})
  gitlabStatus: GitlabStatusComponent;

  constructor(@Inject(AppConfig) public config: AppConfig,
              private router: Router,
              private fb: FormBuilder,
              public me: MeManager) {
  }

  ngOnInit() {
    window.postMessage(APPLICATION_READY, location.origin);
    this.themeControl.valueChanges.subscribe(theme => this.load(theme));
  }

  logout() {
    this.router.navigate(['/signup/login'])
      .then(() => this.config.token = null);
  }

  private load(theme: Themes) {
    window['themes'](theme);
  }

}
