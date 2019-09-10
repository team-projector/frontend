import {Component, OnInit, ViewChild} from '@angular/core';
import {DefaultSearchFilter, TableComponent, TableFeatures, UI} from 'junte-ui';
import {MilestoneProblem, PagingMilestones} from '../../../models/milestone';
import {deserialize} from 'serialize-ts/dist';
import {finalize, map} from 'rxjs/operators';
import {AllMilestonesGQL, SyncMilestoneGQL} from './milestones.graphql';
import {R} from 'apollo-angular/types';
import {DurationFormat} from '../../../pipes/date';

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
