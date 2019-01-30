import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {DefaultSearchFilter, Order, SearchFilter} from './models';
import {DEFAULT_PAGE, DEFAULT_PAGE_SIZE} from '../../../consts';
import {FormBuilder} from '@angular/forms';
import {filter as filtering, finalize} from 'rxjs/operators';
import {TableColumnComponent} from './table-column.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();
  private count: number;

  progress = {loading: false};
  sort = this.formBuilder.control(null);
  order = this.formBuilder.control(Order.asc);

  filterForm = this.formBuilder.group({
    sort: this.sort,
    order: this.order,
    page: [DEFAULT_PAGE],
    pageSize: [DEFAULT_PAGE_SIZE]
  });

  source: any[] = [];

  @Input()
  columns: TableColumnComponent[] = [];

  @Input()
  rowTemplate: TemplateRef<any>;

  @Input()
  filter: SearchFilter = new DefaultSearchFilter({
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE
  });

  @Input()
  fetcher: Function;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.filterForm.valueChanges.pipe((filtering(() => !!this.fetcher)))
      .subscribe(filter => {
        Object.assign(this.filter, filter);
        this.load();
      });
  }

  load() {
    this.progress.loading = true;
    this.fetcher(this.filter)
      .pipe(finalize(() => this.progress.loading = false))
      .subscribe(resp => {
        this.source = resp.results;
        this.count = resp.count;
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  sorting(sort: string) {
    this.filterForm.patchValue(this.sort.value !== sort ?
      {sort: sort, order: Order.asc}
      : {order: this.order.value === Order.asc ? Order.desc : Order.asc});
  }
}
