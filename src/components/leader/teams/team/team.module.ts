import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppLayoutModule, BreadcrumbsModule, GridModule, MenuModule } from '@esanum/ui';
import { TeamComponent } from 'src/components/leader/teams/team/team.component';
import { AppFooterModule } from '../../../layout/footer/app-footer.module';
import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  declarations: [
    TeamComponent
  ],
  imports: [
    TeamRoutingModule,

    CommonModule,
    AppLayoutModule,
    MenuModule,
    GridModule,
    BreadcrumbsModule,
    AppFooterModule
  ]
})
export class TeamModule {

}
