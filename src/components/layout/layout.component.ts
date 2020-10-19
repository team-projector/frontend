import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent, ModalService, PopoverComponent, PopoverService, UI } from '@junte/ui';
import { AppConfig } from 'src/app-config';
import { APPLICATION_READY } from 'src/consts';
import { Themes } from 'src/models/enums/themes';
import { UserRole } from 'src/models/enums/user';
import { LocalUI } from '../../enums/local-ui';
import { Me } from '../../models/user';
import { GitlabStatusComponent } from './gitlab-status/gitlab-status.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  ui = UI;
  localUi = LocalUI;
  userRole = UserRole;
  theme: Themes;

  me: Me;

  @ViewChild('layout', {read: ElementRef, static: true}) backdrop;
  @ViewChild('modal', {static: true}) modal: ModalComponent;
  @ViewChild('popover', {static: true}) popover: PopoverComponent;

  @ViewChild(GitlabStatusComponent)
  gitlabStatus: GitlabStatusComponent;

  constructor(@Inject(AppConfig) public config: AppConfig,
              private modalService: ModalService,
              private popoverService: PopoverService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({me}) => this.me = me);

    window.postMessage(APPLICATION_READY, location.origin);
    this.modalService.register(this.modal);
    this.popoverService.register(this.popover);
  }

  logout() {
    this.router.navigate(['/signup/login'])
      .then(() => this.config.token = null);
  }

}
