import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from 'junte-ui';
import { AuthorizationGuard } from '../../guards/authorization.guard';
import { ArrayPipesModule } from '../../pipes/array-pipes.module';
import { DatePipesModule } from '../../pipes/date-pipes.module';
import { GitlabStatusComponent } from '../gitlab-status/gitlab-status.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DifferencePipe } from './dashboard.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    GitlabStatusComponent,
    DifferencePipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    JunteUiModule,
    ArrayPipesModule,
    DatePipesModule
  ],
  providers: [
    AuthorizationGuard
  ]
})
export class DashboardModule {
}
