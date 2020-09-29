import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JunteUiModule } from '@junte/ui';
import { AppFooterModule } from 'src/components/app-footer/app-footer.module';
import { TeamsRoutingModule } from 'src/components/leader/teams/teams-routing.module';
import { TeamsComponent } from 'src/components/leader/teams/teams.component';
import { OutletModule } from 'src/components/outlet/outlet.module';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';

@NgModule({
  declarations: [
    TeamsComponent
  ],
  imports: [
    TeamsRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    RouterModule,
    DatePipesModule,
    OutletModule,
    ArrayPipesModule,
    AppFooterModule
  ]
})
export class TeamsModule {

}
