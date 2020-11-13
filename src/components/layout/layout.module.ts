import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { CookieService } from 'ngx-cookie-service';
import { DateFnsModule } from 'ngx-date-fns';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { IssueCardModule } from '../shared/issues/card/issue-card.module';
import { GitlabStatusComponent } from './gitlab-status/gitlab-status.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { DifferencePipe } from './layout.pipes';
import { SelectLangComponent } from './select-lang/select-lang.component';
import { AppThemeSwitcherModule } from './theme-switcher/app-theme-switcher.module';

@NgModule({
  declarations: [
    LayoutComponent,
    GitlabStatusComponent,
    DifferencePipe,
    SelectLangComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
    JunteUiModule,
    ArrayPipesModule,
    DatePipesModule,
    IssueCardModule,
    AppThemeSwitcherModule,
    DateFnsModule
  ],
  providers: [
    AuthorizationGuard,
    CookieService
  ]
})
export class LayoutModule {
}
