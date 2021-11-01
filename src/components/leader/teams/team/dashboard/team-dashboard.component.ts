import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@esanum/ui';
import { format } from 'date-fns';
import { DATE_FORMAT } from 'src/consts';
import { LocalUI } from 'src/enums/local-ui';
import { Team } from 'src/models/team';

@Component({
  selector: 'app-leader-team-issues',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.scss']
})
export class TeamDashboardComponent {

  ui = UI;
  localUi = LocalUI;

  team: Team;

  constructor(private route: ActivatedRoute,
              private router: Router) {
    this.route.data.subscribe(({team}) => this.team = team);
  }

  issuesByDeveloper({developer, dueDate}) {
    const params = {developer};
    if (!!dueDate) {
      Object.assign(params, {dueDate: format(dueDate, DATE_FORMAT)});
    }
    this.router.navigate(['issues', params],
      {relativeTo: this.route}).then(() => null);
  }

  issuesByProject(project: string) {
    this.router.navigate(['issues', {project}],
      {relativeTo: this.route}).then(() => null);
  }
}
