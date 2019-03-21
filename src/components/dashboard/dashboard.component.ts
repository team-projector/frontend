import {Component, Inject, OnInit} from '@angular/core';
import {UI} from 'junte-ui';
import {Config} from 'junte-angular';
import {AppConfig} from '../../app-config';
import {MeManager} from '../../managers/me.manager';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ui = UI;

  constructor(@Inject(Config) public config: AppConfig,
              public me: MeManager,
              private router: Router) {
  }

  logout() {
    this.router.navigate(['/signup/login']).then(() =>
      this.config.authorization = null);
  }

  ngOnInit() {
  }

}
