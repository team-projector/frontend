import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MilestonesRoutingModule} from './milestones-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MilestonesComponent} from './milestones.component';
import {JunteUiModule} from 'junte-ui';
import {DatePipesModule} from '../../../pipes/date-pipes.module';

@NgModule({
  declarations: [
    MilestonesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    MilestonesRoutingModule,
    DatePipesModule
  ]
})
export class MilestonesModule {

}
