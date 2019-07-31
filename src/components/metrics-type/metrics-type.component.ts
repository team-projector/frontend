import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MetricType } from 'src/components/leader/teams/team/calendar/team-calendar.component';
import { distinctUntilChanged } from 'rxjs/operators';
import { UI } from 'junte-ui';

const METRIC_TYPE = 'metric_type';

@Component({
  selector: 'app-metrics-type',
  templateUrl: './metrics-type.component.html',
  styleUrls: ['./metrics-type.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MetricsTypeComponent),
      multi: true
    }
  ]
})

export class MetricsTypeComponent implements OnInit, ControlValueAccessor {

  metricType = MetricType;
  ui = UI;

  metric = new FormControl();
  form = this.fb.group({
    metric: this.metric
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.metric.valueChanges.pipe(distinctUntilChanged())
      .subscribe(metric => {
        this.onChange(metric);
        localStorage.setItem(METRIC_TYPE, JSON.stringify(metric));
      });
  }

  writeValue(value: MetricType) {
    const state = JSON.parse(localStorage.getItem(METRIC_TYPE));
    this.metric.patchValue(!value ? (!!state ? state : MetricType.all) : value);
  }

  onChange(value: MetricType) {
  }

  onTouched() {
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

}
