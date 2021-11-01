import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppLayoutModule, BlockModule } from '@esanum/ui';
import { PenaltiesModule } from '../../shared/penalties/penalties.module';
import { DeveloperPenaltiesRoutingModule } from './developer-penalties-routing.module';
import { DeveloperPenaltiesComponent } from './developer-penalties.component';

@NgModule({
  declarations: [
    DeveloperPenaltiesComponent
  ],
  imports: [
    DeveloperPenaltiesRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    AppLayoutModule,
    BlockModule,

    PenaltiesModule
  ]
})
export class DeveloperPenaltiesModule {

}
