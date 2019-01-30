import {Component, EventEmitter, forwardRef, Input, OnInit, Output, TemplateRef} from '@angular/core';
import * as moment from 'moment';
import {today} from '../../../utils/date';
import {Moment} from 'moment';
import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {WeekMetricComponent} from './week-metric.component';
import {Period} from './models';

const WEEKS_DISPLAYED = 5;
const DAYS_IN_WEEK = 7;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarComponent),
      multi: true
    }
  ]

})
export class CalendarComponent implements ControlValueAccessor, OnInit {

  private year$ = new Subject<number>();
  private month$ = new BehaviorSubject<number>(0);
  private _period;

  current: Moment = today();

  @Input()
  metrics: WeekMetricComponent[] = [];

  @Input()
  dayTemplate: TemplateRef<any>;

  @Input()
  metricTemplate: TemplateRef<any>;

  @Output()
  updated = new EventEmitter<Period>();

  weeks = [];

  @Input()
  set year(year: number) {
    this.year$.next(year);
  }

  @Input()
  set month(month: number) {
    this.month$.next(month);
  }

  set period(period: Moment) {
    this._period = period;
    this.update();
  }

  get period() {
    return this._period;
  }

  onChange: (date: Moment) => void;

  constructor() {
    // console.log(moment.localeData().firstDayOfWeek());


    combineLatest(this.year$, this.month$)
      .pipe(filter(([year, month]) => !!year && !!month))
      .subscribe(([year, month]) => this.period = moment().year(year).month(month).date(1));
  }

  ngOnInit() {
    this.period = this.current.startOf('month');
  }

  private update() {
    const start = moment(this.period).startOf('week');
    const date = moment(start);
    this.weeks = [];
    for (let i = 0; i < WEEKS_DISPLAYED; i++) {
      this.weeks[i] = {days: [], date: moment(date)};
      for (let j = 0; j < DAYS_IN_WEEK; j++) {
        this.weeks[i].days[j] = moment(date).add(j, 'day');
      }
      date.add(1, 'week');
    }

    this.updated.emit({start: start, end: date});
  }

  writeValue(date: Moment): void {
    this.current = date;
  }

  registerOnChange(callback: (date: Moment) => void): void {
    this.onChange = (date: Moment) => {
      if (!date.isSame(this.current)) {
        this.current = date;
        callback(date);
      }
    };
  }

  registerOnTouched(fn: () => void): void {

  }

}
