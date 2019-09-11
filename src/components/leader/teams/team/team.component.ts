import { Component, OnInit } from '@angular/core';
import { UI } from 'junte-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { Team } from 'src/models/team';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { deserialize, serialize } from 'serialize-ts/dist';
import { IssuesFilter, IssuesSummary } from '../../../../models/issue';
import { FirstSummaryGQL, SecondSummaryGQL } from './team.graphql';
import { R } from 'apollo-angular/types';
import { DurationFormat } from '../../../../pipes/date';
import { User } from '../../../../models/user';
import { Project } from '../../../../models/project';
import { combineLatest } from 'rxjs';
import { METRIC_TYPE } from 'src/components/metrics-type/consts';
import { MetricType } from 'src/components/leader/teams/team/calendar/team-calendar.component';
import { MergeRequestSummary } from '../../../../models/merge-request';
import { TimeExpensesSummary } from '../../../../models/spent-time';
import { MilestoneProblem } from '../../../../models/milestone';

@Component({
  selector: 'app-leader-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;
  milestoneProblem = MilestoneProblem;
  colors = [UI.colors.purple, UI.colors.red, UI.colors.green, UI.colors.yellow, UI.colors.teal, UI.colors.orange, UI.colors.purpleLight];

  team: Team;
  filter = new FormControl();
  project = new FormControl();

  summary: {
    first?: IssuesSummary, second?: {
      issues: IssuesSummary,
      mergeRequests: MergeRequestSummary
      spentTimes: TimeExpensesSummary
    }
  } = {};

  filter2 = new IssuesFilter();
  metric = new FormControl(localStorage.getItem(METRIC_TYPE) || MetricType.all);
  form: FormGroup = this.formBuilder.group({
    filter: this.filter,
    project: this.project,
    metric: this.metric
  });

  constructor(private firstSummaryGQL: FirstSummaryGQL,
              private secondSummaryGQL: SecondSummaryGQL,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.form.valueChanges.pipe(distinctUntilChanged())
      .subscribe(({filter: {user, dueDate}, project}) => {
        const state: { user?, due_date?, project? } = {};
        if (!!user) {
          state.user = user.id;
        }
        if (!!dueDate) {
          state.due_date = format(dueDate, 'MM-DD-YYYY');
        }
        if (!!project) {
          state.project = project.id || project;
        }
        this.router.navigate([state, 'issues'],
          {relativeTo: this.route});
      });

    const first = this.route.data.pipe(map(({team, user, dueDate}: { team: Team, user: User, dueDate: Date }) =>
      ({
        team: team,
        user: user,
        dueDate: dueDate
      })), distinctUntilChanged(), tap(({team, user, dueDate}) => {
      this.team = team;
      this.form.patchValue({
        filter: {
          user: user,
          dueDate: dueDate
        }
      }, {emitEvent: false});
      this.filter2.team = team.id;
      this.filter2.user = !!user ? user.id : null;
      this.filter2.dueDate = dueDate;
    }));

    first.subscribe(() => {
      this.firstSummaryGQL.fetch(serialize(this.filter2) as R)
        .pipe(map(({data: {summary}}) => deserialize(summary, IssuesSummary)))
        .subscribe(summary => this.summary.first = summary);
    });

    const second = this.route.data.pipe(map(({project}: { project: Project }) =>
      ({
        project: project
      })), distinctUntilChanged(), tap(({project}) => {
      this.project.patchValue(project, {emitEvent: false});
      this.filter2.project = !!project ? project.id : null;
    }));

    combineLatest(first, second)
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.secondSummaryGQL.fetch(serialize(this.filter2) as R)
          .pipe(map(({data: {issues, mergeRequests, spentTimes}}) => ({
            issues: deserialize(issues, IssuesSummary),
            mergeRequests: deserialize(mergeRequests, MergeRequestSummary),
            spentTimes: deserialize(spentTimes, TimeExpensesSummary),
          })))
          .subscribe(summary => this.summary.second = summary);
      });
  }
}
