import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AppLayoutModule,
  AvatarModule,
  ButtonModule,
  DatePickerModule,
  DotModule,
  FormModule,
  GridModule,
  IconModule,
  InformerModule,
  InputModule,
  LabelModule,
  LinkModule,
  MenuModule,
  ModalModule,
  PopoverModule,
  SelectModule,
  SkeletonModule,
  StackModule,
  SwitcherModule
} from '@junte/ui';
import { CookieService } from 'ngx-cookie-service';
import { DateFnsModule } from 'ngx-date-fns';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { DatePipesModule } from 'src/pipes/date-pipes.module';
import { IssueCardModule } from '../shared/issues/card/issue-card.module';
import { UserCardModule } from '../shared/users/card/user-card.module';
import { CreateIssueComponent } from './create-issue/create-issue.component';
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
    SelectLangComponent,
    CreateIssueComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
    ModalModule,
    PopoverModule,
    AppLayoutModule,
    MenuModule,
    StackModule,
    ButtonModule,
    SkeletonModule,
    LabelModule,
    IconModule,
    AvatarModule,
    SwitcherModule,
    InformerModule,
    LinkModule,
    FormModule,
    GridModule,
    InputModule,
    SelectModule,
    ArrayPipesModule,
    DatePickerModule,
    DotModule,
    DatePipesModule,
    IssueCardModule,
    AppThemeSwitcherModule,
    DateFnsModule,

    UserCardModule
  ],
  providers: [
    AuthorizationGuard,
    CookieService
  ]
})
export class LayoutModule {
}
