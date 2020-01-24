import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent, ModalService, PopoverComponent, PopoverService, UI } from 'junte-ui';
import { AppConfig } from 'src/app-config';
import { APPLICATION_READY } from 'src/consts';
import { MeManager } from 'src/managers/me.manager';
import { UserRole } from 'src/models/enums/user';
import { GitlabStatusComponent } from '../gitlab-status/gitlab-status.component';
import {LocalUI} from '../../enums/local-ui';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ui = UI;
  localUi = LocalUI;
  userRole = UserRole;

  @ViewChild('layout', {read: ElementRef, static: true}) backdrop;
  @ViewChild('modal', {static: true}) modal: ModalComponent;
  @ViewChild('popover', {static: true}) popover: PopoverComponent;

  @ViewChild(GitlabStatusComponent)
  gitlabStatus: GitlabStatusComponent;

  constructor(@Inject(AppConfig) public config: AppConfig,
              private modalService: ModalService,
              private popoverService: PopoverService,
              private router: Router,
              public me: MeManager) {
  }

  ngOnInit() {
    window.postMessage(APPLICATION_READY, location.origin);
    this.modalService.register(this.modal);
    this.popoverService.register(this.popover);
  }

  logout() {
    this.router.navigate(['/signup/login'])
      .then(() => this.config.token = null);
  }

}
