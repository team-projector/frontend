import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DefaultSearchFilter, TableComponent, UI} from 'junte-ui';
import {PagingMilestones} from '../../../models/milestone';
import {graph_ql_service, IGraphQLService} from '../../../services/graphql/interface';
import {deserialize} from 'serialize-ts/dist';
import {map} from 'rxjs/operators';

export const query = `query ($offset: Int, $first: Int){
  allMilestones (offset: $offset, first: $first) {
    count
    edges {
      node {
        id
        title
        owner {
          __typename
          title
          glUrl
        }
        budget
        startDate
        dueDate
        glUrl
        metrics {
          budgetRemains
          profit
        }
      }
    }
  }
}`;

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent implements OnInit {

  ui = UI;

  @ViewChild('table')
  table: TableComponent;

  constructor(@Inject(graph_ql_service) private graphQL: IGraphQLService) {

  }

  ngOnInit() {
    this.table.fetcher = (filter: DefaultSearchFilter) => {
      return this.graphQL.get(query, filter)
        .pipe(map(({data: {allMilestones}}) =>
          deserialize(allMilestones, PagingMilestones)));
    };
    this.table.load();
  }
}
