import {Component, Inject, OnInit} from '@angular/core';
import {finalize, map} from 'rxjs/operators';
import {UI} from 'junte-ui';
import {graph_ql_service, IGraphQLService} from '../../../services/graphql/interface';
import {deserialize} from 'serialize-ts/dist';
import {PagingTeams, Team} from '../../../models/team';

@Component({
  selector: 'app-leader-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  ui = UI;
  teams: Team[] = [];
  loading: boolean;

  private query = `query ($first: Int) {
    allTeams(first: $first) {
      count
      edges {
        node {
          id
          title
          members (first: 4, roles: "developer") {
            count
            edges {
              node {
                user {
                  glAvatar
                }
              }
            }
          }
          metrics {
            issuesCount
            problemsCount
          }
        }
      }
    }
  }`;

  constructor(@Inject(graph_ql_service) private graphQL: IGraphQLService) {
  }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.loading = true;
    this.graphQL.get(this.query)
      .pipe(map(({data: {allTeams}}: { data: { allTeams } }) =>
        deserialize(allTeams, PagingTeams)), finalize(() => this.loading = false))
      .subscribe(teams => this.teams = teams.results);
  }

}
