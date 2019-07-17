import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../../models/graphql/user';
import {ViewType} from '../../../issues/issues/issues.component';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

  viewType = ViewType;

  user: User;
  dueDate: Date;
  opened: boolean;
  problems: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({dueDate, user, opened, problems}) =>
      [this.dueDate, this.user, this.opened, this.problems] =
        [dueDate, user, opened, problems]);
  }

  filtered(state: { opened?, problems? }) {
    this.router.navigate([state],
      {relativeTo: this.route});
  }

}
