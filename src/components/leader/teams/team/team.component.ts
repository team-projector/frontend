import {Component, Inject, OnInit} from '@angular/core';
import {UI} from 'junte-ui';
import {ActivatedRoute, Router} from '@angular/router';
import {format} from 'date-fns';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {Team} from 'src/models/team';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {graph_ql_service, IGraphQLService} from '../../../../services/graphql/interface';
import {deserialize, serialize} from 'serialize-ts/dist';
import {IssuesFilter, IssuesSummary} from '../../../../models/issue';

const query = {
  summary: `query ($team: ID, $user: ID, $dueDate: Date, $state: String) {
  issuesSummary(team: $team, user: $user, dueDate: $dueDate, state: $state) {
    issuesCount
    timeSpent
    problemsCount
  }
}`
};

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

  constructor(@Inject(graph_ql_service) private graphQL: IGraphQLService,
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

      this.graphQL.get(query.summary, serialize(filter))
        .pipe(map(({data: {issuesSummary}}: { data: { issuesSummary } }) =>
          deserialize(issuesSummary, IssuesSummary)))
        .subscribe(summary => this.summary = summary);
    });
  }
}
