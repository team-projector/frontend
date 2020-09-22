import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { format } from 'date-fns';
import { DATE_FORMAT } from '../../../consts';
import { Project } from '../../../models/project';
import { Me } from '../../../models/user';

@Component({
  selector: 'app-developer-dashboard',
  templateUrl: './developer-dashboard.component.html',
  styleUrls: ['./developer-dashboard.component.scss']
})
export class DeveloperDashboardComponent {

  ui = UI;

  me: Me;

  constructor(public route: ActivatedRoute,
              public router: Router) {
    this.route.data.subscribe(({me}) => this.me = me);
  }

  issuesByDueDate(date: Date) {
    this.router.navigate(['issues', {dueDate: format(date, DATE_FORMAT)}],
      {relativeTo: this.route})
      .then(() => null);
  }

  issuesByProject(project: string) {
    this.router.navigate(['issues', {project: project}],
      {relativeTo: this.route})
      .then(() => null);
  }

}
