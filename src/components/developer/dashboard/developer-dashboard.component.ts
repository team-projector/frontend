import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { Me } from 'src/models/user';
import { LocalUI } from 'src/enums/local-ui';

@Component({
  selector: 'app-developer-dashboard',
  templateUrl: './developer-dashboard.component.html',
  styleUrls: ['./developer-dashboard.component.scss']
})
export class DeveloperDashboardComponent {

  ui = UI;
  localUi = LocalUI;

  me: Me;

  constructor(public route: ActivatedRoute,
              public router: Router) {
    this.route.data.subscribe(({me}) => this.me = me);
  }

  issuesByProject(project: string) {
    this.router.navigate(['issues', {project}],
      {relativeTo: this.route}).then(() => null);
  }

}
