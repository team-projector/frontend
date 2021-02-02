import { Component, ComponentFactoryResolver, ElementRef, Inject, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalOptions, ModalService, PopoverService, UI } from '@junte/ui';
import { merge } from 'rxjs';
import { AppConfig } from 'src/app-config';
import { APPLICATION_READY } from 'src/consts';
import { LocalUI } from 'src/enums/local-ui';
import { Themes } from 'src/models/enums/themes';
import { UserRole } from 'src/models/enums/user';
import { Me } from 'src/models/user';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
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

  @ViewChild(GitlabStatusComponent)
  gitlabStatus: GitlabStatusComponent;

  constructor(@Inject(AppConfig) public config: AppConfig,
              private modalService: ModalService,
              private popoverService: PopoverService,
              private injector: Injector,
              private cfr: ComponentFactoryResolver,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({me}) => this.me = me);

    window.postMessage(APPLICATION_READY, location.origin);
  }

  editProfile() {
    const component = this.cfr.resolveComponentFactory(EditProfileComponent).create(this.injector);
    const options = new ModalOptions({
      title: {
        text: 'Edit profile',
        icon: UI.icons.settings
      }
    });
    merge(component.instance.canceled, component.instance.saved)
      .subscribe(() => this.modalService.close());
    this.modalService.open(component, options);
  }

  logout() {
    this.router.navigate(['/signup/login'])
      .then(() => this.config.token = null);
  }

}
