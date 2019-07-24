import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/models/user';
import {Team} from 'src/models/team';
import {UI} from 'junte-ui';
import {finalize, map} from 'rxjs/operators';
import {ArraySerializer, deserialize, ModelSerializer, serialize} from 'serialize-ts';
import {ProjectSummary} from '../../../../../../models/project';
import {ProjectsSummaryGQL} from './projects-summary.graphql';
import {IssuesFilter} from '../../../../../../models/issue';
import {R} from 'apollo-angular/types';
import {DurationFormat} from '../../../../../../pipes/date';

@Component({
  selector: 'app-team-list-issues-component',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})

export class TeamIssuesListComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;

  user: User;
  dueDate: Date;
  team: Team;
  opened: boolean;
  problems: boolean;

  summary: ProjectSummary[] = [];
  progress = {loading: false};
  colors = [UI.colors.purple, UI.colors.red, UI.colors.green, UI.colors.yellow];

  constructor(private projectsSummary: ProjectsSummaryGQL,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe(({team, dueDate, user, opened, problems}) => {
      [this.team, this.dueDate, this.user, this.opened, this.problems] =
        [team, dueDate, user, opened, problems];
      this.loadProjectsSummary();
    });
  }

  private loadProjectsSummary() {
    const filter = new IssuesFilter({
      team: this.team ? this.team.id : null,
      user: this.user ? this.user.id : null,
      dueDate: this.dueDate
    });

    this.progress.loading = true;
    this.projectsSummary.fetch(serialize(filter) as R)
      .pipe(map(({data: {issuesSummary: {projects}}}) =>
          projects.map(p => deserialize(p, ProjectSummary))),
        finalize(() => this.progress.loading = false))
      .subscribe(summary => this.summary = summary);
  }

  filtered(state: { opened?, problems? }) {
    this.router.navigate([state],
      {relativeTo: this.route});
  }
}
