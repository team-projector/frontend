import {Component, Inject} from '@angular/core';
import {MeManager} from '../managers/me.manager';
import {Config} from 'junte-angular';
import {AppConfig} from '../app-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(@Inject(Config) private config: AppConfig,
              public me: MeManager) {
  }

  logout() {
    this.config.authorization = null;
  }
}
