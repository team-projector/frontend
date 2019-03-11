import {Component, Inject} from '@angular/core';
import {Config} from 'junte-angular';
import {AppConfig} from '../../../app-config';
import {MeManager} from '../../../managers/me.manager';
import {Router} from '@angular/router';
import {UserRole} from '../../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  userRole = UserRole;

  constructor(@Inject(Config) public config: AppConfig,
              public me: MeManager,
              private router: Router) {
  }

  logout() {
    this.router.navigate(['/signup/login']).then(() =>
      this.config.authorization = null);
  }

}
