import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../../models/user';
import { ViewType } from '../../../issues/issues/issues.component';
import { Project } from '../../../../models/project';
import { IssuesType } from '../../../../models/issue';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

  viewType = ViewType;

  user: User;
  project: Project;
  dueDate: Date;
  type: IssuesType;
  problems: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({user, project, dueDate, type}) =>
      [this.user, this.project, this.dueDate, this.type] =
        [user, project, dueDate, type]);
  }

  filtered(state: { type? }) {
    this.router.navigate([state],
      {relativeTo: this.route})
      .then(() => null);
  }

}
