import { Component, OnInit } from '@angular/core';
import { UI } from 'junte-ui';
import { of } from 'rxjs';
import { delay, finalize, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { MOCKS_DELAY } from 'src/consts';
import { environment } from 'src/environments/environment';
import { DurationFormat } from 'src/models/enums/duration-format';
import { PagingTeams, Team } from 'src/models/team';
import { catchGQLErrors } from 'src/operators/catch-gql-error';
import { getMock } from 'src/utils/mocks';
import { AllTeamsGQL } from './teams.graphql';

@Component({
  selector: 'app-leader-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;
  teams: Team[] = [];
  loading: boolean;

  constructor(private allTeamsApollo: AllTeamsGQL) {
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.loading = true;
    (environment.mocks
      ? of(getMock(PagingTeams)).pipe(delay(MOCKS_DELAY))
      : this.allTeamsApollo.fetch().pipe(catchGQLErrors(),
        map(({data: {teams}}) =>
          deserialize(teams, PagingTeams))
      )).pipe(finalize(() => this.loading = false))
      .subscribe(teams => this.teams = teams.results);
  }
}
