import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../../models/user';
import {ViewType} from '../../../issues/issues/issues.component';
import {Project} from '../../../../models/project';

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
  opened: boolean;
  problems: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({user, project, dueDate, opened, problems}) =>
      [this.user, this.project, this.dueDate, this.opened, this.problems] =
        [user, project, dueDate, opened, problems]);
  }

  filtered(state: { opened?, problems? }) {
    this.router.navigate([state],
      {relativeTo: this.route});
  }

}
