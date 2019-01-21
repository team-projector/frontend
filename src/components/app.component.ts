import {Component} from '@angular/core';
import {MeManager} from '../managers/me.manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public me: MeManager) {
  }
}
