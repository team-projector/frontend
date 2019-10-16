import { Component, OnInit } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { UI } from 'junte-ui';
import { deserialize } from 'serialize-ts/dist';
import { PagingTeams, Team } from 'src/models/team';
import { AllTeamsGQL } from './teams.graphql';
import { DurationFormat } from 'src/pipes/date';

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
    this.allTeamsApollo.fetch()
      .pipe(map(({data: {teams}}) => deserialize(teams, PagingTeams)),
        finalize(() => this.loading = false)
      )
      .subscribe(teams => this.teams = teams.results);
  }

}
