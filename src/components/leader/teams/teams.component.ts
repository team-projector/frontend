import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UI } from '@junte/ui';
import { R } from 'apollo-angular/types';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize, serialize } from '@junte/serialize-ts';
import { MOCKS_DELAY, UI_DELAY } from 'src/consts';
import { LocalUI } from 'src/enums/local-ui';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { PagingTeams, Team, TeamsFilter } from 'src/models/team';
import { catchGQLErrors } from 'src/utils/gql-errors';
import { BackendError } from 'src/types/gql-errors';
import { equals } from 'src/utils/equals';
import { getMock } from '@junte/mocker';
import { AllTeamsGQL } from './teams.graphql';
import { TeamsState, TeamsStateUpdate } from './teams.types';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  ui = UI;
  localUi = LocalUI;
  durationFormat = DurationFormat;

  filter: TeamsFilter;
  teams: Team[] = [];
  errors: BackendError[] = [];
  loading: boolean;
  count: number;

  offsetControl = this.fb.control(0);
  form = this.fb.group(
    {
      first: 10,
      offset: this.offsetControl
    }
  );

  constructor(private allTeamsGQL: AllTeamsGQL,
              private fb: FormBuilder,
              public router: Router,
              public route: ActivatedRoute,
              private logger: NGXLogger) {
  }

  ngOnInit() {
    this.route.params.subscribe(({offset}) => {
      const state = new TeamsState({
        offset: +offset || 0
      });
      this.logger.debug('state was changed', state);
      this.form.patchValue(state, {emitEvent: false});

      this.load();
    });

    this.form.valueChanges
      .subscribe(({offset}) => {
        const state = new TeamsStateUpdate({
          offset: offset
        });
        this.logger.debug('updating state', state);
        this.router.navigate([serialize(state)],
          {relativeTo: this.route}).then(() => null);
      });
  }

  private load() {
    const {first, offset} = this.form.getRawValue();
    const filter = new TeamsFilter({first, offset});
    if (equals(filter, this.filter)) {
      this.logger.debug('filter was not changed');
      return;
    }
    this.filter = filter;

    this.loading = true;
    const action = environment.mocks
      ? of(getMock(PagingTeams)).pipe(delay(MOCKS_DELAY))
      : this.allTeamsGQL.fetch(serialize(this.filter) as R).pipe(catchGQLErrors(),
        map(({data: {teams}}) => deserialize(teams, PagingTeams)));

    action.pipe(delay(UI_DELAY), finalize(() => this.loading = false))
      .subscribe(teams => [this.teams, this.count] = [teams.results, teams.count],
        err => this.errors = err);
  }

}
