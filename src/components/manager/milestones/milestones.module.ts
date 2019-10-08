import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from 'junte-ui';
import { OutletModule } from 'src/components/outlet/outlet.module';
import { CurrencyRublePipeModule } from 'src/pipes/currency-ruble.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { DueDateResolver, IssuesTypeResolver } from 'src/resolvers/issue';
import { MilestoneResolver } from 'src/resolvers/milestone';
import { ProjectResolver } from 'src/resolvers/project';
import { TeamResolver } from 'src/resolvers/team';
import { UserResolver } from 'src/resolvers/user';
import { MilestoneComponent } from './milestone/milestone.component';
import { MilestonesRoutingModule } from './milestones-routing.module';
import { MilestonesComponent } from './milestones.component';

@NgModule({
  declarations: [
    MilestonesComponent,
    MilestoneComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule,
    MilestonesRoutingModule,
    DatePipesModule,
    CurrencyRublePipeModule,
    OutletModule
  ],
  providers: [
    TeamResolver,
    MilestoneResolver,
    UserResolver,
    ProjectResolver,
    DueDateResolver,
    IssuesTypeResolver
  ]
})
export class MilestonesModule {

}
