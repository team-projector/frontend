import { Component, ElementRef, HostBinding, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalComponent, ModalService, PopoverComponent, PopoverService, UI } from 'junte-ui';
import { AppConfig } from 'src/app-config';
import { APPLICATION_READY } from 'src/consts';
import { MeManager } from 'src/managers/me.manager';
import { Themes } from 'src/models/enums/themes';
import { UserRole } from 'src/models/enums/user';
import { GitlabStatusComponent } from '../gitlab-status/gitlab-status.component';
import {LocalUI} from '../../enums/local-ui';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private _theme = !!localStorage.theme ? Themes[localStorage.theme] as Themes : Themes.light;

  ui = UI;
  localUi = LocalUI;
  userRole = UserRole;
  loading = false;
  themes = Themes;
  themeControl = new FormControl(Themes[localStorage.theme]);

  themeForm = this.fb.group({
    theme: this.themeControl
  });

  @HostBinding('attr.theme')
  set theme(theme: Themes) {
    this._theme = theme;
    this.load(theme);
  }

  get theme() {
    return this._theme;
  }

  @ViewChild('layout', {read: ElementRef, static: true}) backdrop;
  @ViewChild('modal', {static: true}) modal: ModalComponent;
  @ViewChild('popover', {static: true}) popover: PopoverComponent;

  @ViewChild(GitlabStatusComponent)
  gitlabStatus: GitlabStatusComponent;

  constructor(@Inject(AppConfig) public config: AppConfig,
              private modalService: ModalService,
              private popoverService: PopoverService,
              private router: Router,
              private fb: FormBuilder,
              public me: MeManager) {
  }

  ngOnInit() {
    window.postMessage(APPLICATION_READY, location.origin);
    this.themeControl.setValue(this.theme);
    this.themeControl.valueChanges.subscribe(theme => this.theme = theme);
    this.modalService.register(this.modal);
    this.popoverService.register(this.popover);
  }

  logout() {
    this.router.navigate(['/signup/login'])
      .then(() => this.config.token = null);
  }

  private load(theme: Themes) {
    this.loading = true;
    window['themes'](theme, () => this.loading = false);
  }

}
