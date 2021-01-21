import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AppLayoutModule, AvatarModule,
  BreadcrumbsModule,
  CardModule, FormModule,
  GridModule,
  InformerModule,
  JunteUiModule, LabelModule, PagerModule,
  SkeletonModule,
  StackModule
} from '@junte/ui';
import { AppFooterModule } from 'src/components/layout/footer/app-footer.module';
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
    AppLayoutModule,
    InformerModule,
    GridModule,
    BreadcrumbsModule,
    CardModule,
    StackModule,
    SkeletonModule,
    AvatarModule,
    LabelModule,
    FormModule,
    PagerModule,
    RouterModule,
    DatePipesModule,
    OutletModule,
    ArrayPipesModule,
    AppFooterModule
  ]
})
export class TeamsModule {

}
