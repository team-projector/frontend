import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {TableComponent, UI} from 'junte-ui';
import {IMilestonesService, milestones_service} from '../../../services/milestones/interface';
import {MilestonesFilter} from '../../../models/milestone';
import {IssuesFilter} from '../../../models/graphql/issue';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit {
  ui = UI;

  @ViewChild('table')
  table: TableComponent;

  constructor(@Inject(milestones_service) private milestonesService: IMilestonesService) {

  }

  ngOnInit() {
    this.table.fetcher = (filter: IssuesFilter) => this.milestonesService
      .list(new MilestonesFilter(Object.assign(filter, {active: true})));
    this.table.load();
  }
}
