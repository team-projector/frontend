import { Component, OnInit } from '@angular/core';
import { UI } from 'junte-ui';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Team } from 'src/models/team';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { deserialize, serialize } from 'serialize-ts/dist';
import { IssuesFilter, IssuesSummary } from '../../../../models/issue';
import { TeamIssuesSummaryGQL } from './team.graphql';
import { R } from 'apollo-angular/types';

@Component({
  selector: 'app-leader-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  ui = UI;

  team: Team;
  summary: IssuesSummary;
  filter = new FormControl();

  form: FormGroup = this.formBuilder.group({
    filter: this.filter
  });

  constructor(private teamIssuesSummaryApollo: TeamIssuesSummaryGQL,
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

      const filter = new IssuesFilter({
        team: team.id,
        user: !!user ? user.id : null,
        dueDate: dueDate
      });

      this.teamIssuesSummaryApollo.fetch(serialize(filter) as R)
        .pipe(map(({data: {issuesSummary}}: { data: { issuesSummary } }) =>
          deserialize(issuesSummary, IssuesSummary)))
        .subscribe(summary => this.summary = summary);
    });
  }
}
