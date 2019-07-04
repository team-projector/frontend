import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { UI } from 'junte-ui';
import { Config } from 'junte-angular';
import { AppConfig } from '../../app-config';
import { MeManager } from '../../managers/me.manager';
import { Router } from '@angular/router';
import { gitlab_service, IGitlabService } from '../../services/gitlab/interface';
import { Status } from '../../models/status';

const STATUS_TIMEOUT = 60000;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  ui = UI;
  status: Status;

  @ViewChild('status') statusEl: ElementRef;

  constructor(@Inject(Config) public config: AppConfig,
              @Inject(gitlab_service) public gitlabService: IGitlabService,
              private router: Router,
              public me: MeManager) {
  }

  logout() {
    this.router.navigate(['/signup/login'])
      .then(() => this.config.authorization = null);
  }

  ngOnInit() {
    this.load();
    setInterval(() => this.load(), STATUS_TIMEOUT);
  }

  load() {
    this.gitlabService.getStatus().subscribe(status => this.status = status);
  }

}
