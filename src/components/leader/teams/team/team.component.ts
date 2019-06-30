import {Component, Inject, OnInit} from '@angular/core';
import {UI} from 'junte-ui';
import {ActivatedRoute, Router} from '@angular/router';
import {format} from 'date-fns';
import {distinctUntilChanged} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {Team} from 'src/models/team';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {IIssuesService, issues_service} from '../../../../services/issues/interface';
import {IssuesFilter, IssuesSummary} from '../../../../models/issue';

@Component({
  selector: 'app-leader-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  ui = UI;

  private team$ = new BehaviorSubject<Team>(null);

  summary: IssuesSummary;
  filter = new FormControl();

  form: FormGroup = this.formBuilder.group({
    filter: this.filter
  });

  set team(team: Team) {
    this.team$.next(team);
  }

  get team() {
    return this.team$.getValue();
  }

  constructor(@Inject(issues_service) private issuesService: IIssuesService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.filter.valueChanges.pipe(distinctUntilChanged())
      .subscribe(filter => {
        const state: { user?, due_date? } = {};
        if (!!filter.user) {
          state.user = filter.user.id;
        }
        if (!!filter.dueDate) {
          state.due_date = format(filter.dueDate, 'MM-DD-YYYY');
        }
        this.router.navigate([state, 'issues'],
          {relativeTo: this.route});
      });

    this.route.data.subscribe(({team, user, dueDate}) => {
      this.team = team;
      this.form.patchValue({
        filter: {
          user: user,
          dueDate: dueDate
        }
      }, {emitEvent: false});

      this.issuesService.summary(new IssuesFilter({
        team: team.id,
        user: !!user ? user.id : null,
        dueDate: dueDate
      })).subscribe(summary => this.summary = summary);
    });
  }
}
