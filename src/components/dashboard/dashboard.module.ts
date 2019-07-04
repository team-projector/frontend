import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AuthorizationGuard } from '../../guards/authorization.guard';
import { JunteUiModule } from 'junte-ui';
import { ArrayPipesModule } from '../../pipes/array-pipes.module';
import { DifferencePipe } from './dashboard.pipe';
import { DatePipesModule } from '../../pipes/date-pipes.module';
import { GitlabServiceProvider } from 'src/services/gitlab/provider';

@NgModule({
  declarations: [
    DashboardComponent,
    DifferencePipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    JunteUiModule,
    DashboardRoutingModule,
    ArrayPipesModule,
    DatePipesModule
  ],
  providers: [
    AuthorizationGuard,
    GitlabServiceProvider
  ]
})
export class DashboardModule {
}
