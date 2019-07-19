import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {DefaultSearchFilter, TableComponent, UI} from 'junte-ui';
import {PagingMilestones} from '../../../models/milestone';
import {graph_ql_service, IGraphQLService} from '../../../services/graphql/interface';
import {deserialize} from 'serialize-ts/dist';
import {map} from 'rxjs/operators';

export const query = `query ($orderBy: String, $offset: Int, $first: Int) {
  allMilestones(active: true, orderBy: $orderBy, offset: $offset, first: $first) {
    count
    edges {
      node {
        id
        title
        owner {
          fullTitle
          glUrl
        }
        budget
        startDate
        dueDate
        glUrl
        metrics {
          customerPayroll
          payroll
          budgetRemains
          profit
          timeEstimate
          timeSpent
          timeRemains
          issuesCount
          issuesOpenedCount
          issuesClosedCount
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
