import { NgModule } from '@angular/core';
import { MetricsTypeComponent } from './metrics-type.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DotModule, FormModule, SwitcherModule } from '@junte/ui';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormModule,
    SwitcherModule,
    DotModule
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
