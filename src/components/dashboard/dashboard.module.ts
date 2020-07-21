import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { CookieService } from 'ngx-cookie-service';
import { DateFnsModule } from 'ngx-date-fns';
import { IssuesModule } from 'src/components/issues/issues.module';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { GitlabStatusComponent } from '../gitlab-status/gitlab-status.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DifferencePipe } from './dashboard.pipe';
import { SelectLangComponent } from './select-lang/select-lang.component';
import { AppThemeSwitcherModule } from '../app-theme-switcher/app-theme-switcher.module';

@NgModule({
  declarations: [
    DashboardComponent,
    GitlabStatusComponent,
    DifferencePipe,
    SelectLangComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    JunteUiModule,
    ArrayPipesModule,
    DatePipesModule,
    IssuesModule,
    AppThemeSwitcherModule,
    DateFnsModule
  ],
  providers: [
    AuthorizationGuard,
    CookieService
  ]
})
export class DashboardModule {
}
