import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { IssueState } from 'src/models/issue';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'src/consts';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, filter as filtering } from 'rxjs/operators';
import { TableComponent, UI } from 'junte-ui';
import { SalariesFilter } from 'src/models/salaries';
import { ISalariesService, salaries_service } from 'src/services/salaries/interface';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.scss']
})
export class SalariesComponent implements OnInit {

  ui = UI;

  private user$ = new BehaviorSubject<number>(null);

  @Input()
  set user(user: number) {
    this.user$.next(user);
  }

  filter: SalariesFilter = new SalariesFilter({page: DEFAULT_PAGE, pageSize: DEFAULT_PAGE_SIZE});

  @ViewChild(TableComponent)
  table: TableComponent;

  constructor(@Inject(salaries_service) private salariesService: ISalariesService) {
  }

  ngOnInit() {
    this.user$.pipe(filtering(u => !!u), distinctUntilChanged())
      .subscribe(user => {
        this.table.fetcher = (filter: SalariesFilter) =>
          this.salariesService.forUser(user, Object.assign(this.filter, filter));
        this.table.load();
      });
  }

}
