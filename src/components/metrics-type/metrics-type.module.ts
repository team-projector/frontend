import { NgModule } from '@angular/core';
import { MetricsTypeComponent } from './metrics-type.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from 'junte-ui';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule
  ],
  exports: [
    MetricsTypeComponent
  ],
  declarations: [
    MetricsTypeComponent
  ]
})
export class MetricsTypeModule {
}
