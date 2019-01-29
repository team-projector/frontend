import {Component, forwardRef, Input, OnInit, TemplateRef} from '@angular/core';
import {Moment} from 'moment';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {today} from '../../../../utils/date';
import * as moment from 'moment';

const DAYS_IN_WEEK = 7;

@Component({
  selector: 'app-calendar-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WeekComponent),
      multi: true
    }
  ]

})
export class WeekComponent implements ControlValueAccessor, OnInit {

  private _period;

  current: Moment = today();
  days: Moment[] = [];

  @Input()
  dayTemplate: TemplateRef<any>;

  onChange: (date: Moment) => void;

  @Input()
  set period(period: Moment) {
    this._period = period;
    this.update();
  }

  get period() {
    return this._period;
  }

  ngOnInit() {
    this.period = this.current.startOf('week');
  }

  private update() {
    const start = moment(this.period).startOf('week');
    const date = moment(start);
    this.days = [];
    for (let j = 0; j < DAYS_IN_WEEK; j++) {
      this.days[j] = moment(date);
      date.add(1, 'day');
    }
  }

  writeValue(date: Moment): void {
    this.current = date;
  }

  registerOnChange(callback: (date: Moment) => void): void {
    this.onChange = (date: Moment) => {
      if (!date.isSame(this.current)) {
        console.log(date.format());
        this.current = date;
        callback(date);
      }
    };
  }

  registerOnTouched(fn: () => void): void {

  }

}
