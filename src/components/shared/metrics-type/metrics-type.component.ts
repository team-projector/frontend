import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';
import { UI } from '@esanum/ui';
import { METRIC_TYPE } from 'src/components/shared/metrics-type/consts';
import { MetricType } from 'src/models/enums/metrics';

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
        localStorage.setItem(METRIC_TYPE, metric);
      });
  }

  writeValue(value: MetricType) {
    this.metric.patchValue(value, {emitEvent: false});
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
