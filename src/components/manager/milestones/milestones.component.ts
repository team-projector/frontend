import { Component, OnInit, ViewChild } from '@angular/core';
import { R } from 'apollo-angular/types';
import { DefaultSearchFilter, TableComponent, TableFeatures, UI } from 'junte-ui';
import { finalize, map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts/dist';
import { MilestoneProblem, PagingMilestones } from 'src/models/milestone';
import { DurationFormat } from 'src/pipes/date';
import { AllMilestonesGQL, SyncMilestoneGQL } from './milestones.graphql';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent implements OnInit {

  ui = UI;
  durationFormat = DurationFormat;
  features = TableFeatures;
  milestoneProblem = MilestoneProblem;
  progress = {sync: false};

  @ViewChild('table', {static: true})
  table: TableComponent;

  constructor(private allMilestonesGQL: AllMilestonesGQL,
              private syncMilestoneGQL: SyncMilestoneGQL) {
  }

  ngOnInit() {
    this.table.fetcher = (filter: DefaultSearchFilter) => {
      return this.allMilestonesGQL.fetch(filter as R)
        .pipe(map(({data: {allMilestones}}) =>
          deserialize(allMilestones, PagingMilestones)));
    };
    this.table.load();
  }

  sync(issue: number) {
    this.progress.sync = true;
    this.syncMilestoneGQL.mutate({id: issue})
      .pipe(finalize(() => this.progress.sync = false))
      .subscribe(() => this.table.load());
  }
}
