import {Component, OnInit} from '@angular/core';
import {UI} from 'junte-ui';
import {ActivatedRoute, Router} from '@angular/router';
import {format} from 'date-fns';
import {distinctUntilChanged, map, tap} from 'rxjs/operators';
import {Team} from 'src/models/team';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {deserialize, serialize} from 'serialize-ts/dist';
import {IssuesFilter, IssuesSummary, IssueState, IssuesType} from '../../../../models/issue';
import {FirstSummaryGQL, SecondSummaryGQL, ThirdSummaryGQL} from './team.graphql';
import {R} from 'apollo-angular/types';
import {DurationFormat} from '../../../../pipes/date';
import {User} from '../../../../models/user';
import {Project} from '../../../../models/project';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-leader-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  ui = UI;
  issuesType = IssuesType;
  durationFormat = DurationFormat;
  colors = [UI.colors.purple, UI.colors.red, UI.colors.green, UI.colors.yellow];

  team: Team;
  filter = new FormControl();
  project = new FormControl();

  summary: { first?: IssuesSummary, second?: IssuesSummary, third?: IssuesSummary } = {};

  filter2 = new IssuesFilter();

  form: FormGroup = this.formBuilder.group({
    filter: this.filter,
    project: this.project,
    type: [IssuesType.opened]
  });

  constructor(private firstSummaryGQL: FirstSummaryGQL,
              private secondSummaryGQL: SecondSummaryGQL,
              private thirdSummaryGQL: ThirdSummaryGQL,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.form.valueChanges.pipe(distinctUntilChanged())
      .subscribe(({filter: {user, dueDate}, project, type}) => {
        const state: { user?, due_date?, project?, type? } = {};
        if (!!user) {
          state.user = user.id;
        }
        if (!!dueDate) {
          state.due_date = format(dueDate, 'MM-DD-YYYY');
        }
        if (!!project) {
          state.project = project.id;
        }
        if (type !== IssuesType.opened) {
          state.type = type;
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
          dueDate: dueDate,
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
          .pipe(map(({data: {summary}}) => deserialize(summary, IssuesSummary)))
          .subscribe(summary => this.summary.second = summary);
      });

    const third = this.route.data.pipe(map(({type}: { type: IssuesType }) =>
      ({
        type: type
      })), distinctUntilChanged(), tap(({type}) => {
      this.form.patchValue({
        type: type
      }, {emitEvent: false});
      this.filter2.state = type === IssuesType.opened ? IssueState.opened : null;
      this.filter2.problems = type === IssuesType.problems ? true : null;
    }));

    combineLatest(first, second, third)
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.thirdSummaryGQL.fetch(serialize(this.filter2) as R)
          .pipe(map(({data: {summary}}) => deserialize(summary, IssuesSummary)))
          .subscribe(summary => this.summary.third = summary);
      });
  }
}
