import { Component, OnInit, ViewChild } from '@angular/core';
import { DefaultSearchFilter, TableComponent, TableFeatures, UI } from 'junte-ui';
import { PagingMilestones } from '../../../models/milestone';
import { deserialize } from 'serialize-ts/dist';
import { map } from 'rxjs/operators';
import { AllMilestonesGQL } from './milestones.graphql';
import { R } from 'apollo-angular/types';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent implements OnInit {

  ui = UI;
  features = TableFeatures;

  @ViewChild('table')
  table: TableComponent;

  constructor(private allMilestonesApollo: AllMilestonesGQL) {
  }

  ngOnInit() {
    this.table.fetcher = (filter: DefaultSearchFilter) => {
      return this.allMilestonesApollo.fetch(filter as R)
        .pipe(map(({data: {allMilestones}}) =>
          deserialize(allMilestones, PagingMilestones)));
    };
    this.table.load();
  }
}
