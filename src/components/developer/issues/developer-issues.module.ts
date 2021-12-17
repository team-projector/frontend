import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
    AppLayoutModule,
    BlockModule,
    ButtonModule,
    CalendarModule,
    DotModule,
    IconModule,
    LabelModule,
    LinkModule,
    MenuModule,
    StackModule,
} from '@esanum/ui';
import { IssuesListModule } from 'src/components/shared/issues/list/issues-list.module';
import { DeveloperIssuesRoutingModule } from './developer-issues-routing.module';
import { DeveloperIssuesComponent } from './developer-issues.component';
import { DeveloperIssuesListComponent } from './list/developer-issues-list.component';
import { DeveloperIssuesCalendarComponent } from './calendar/developer-issues-calendar.component';
import { DatePipesModule } from '../../../pipes/date-pipes.module';
import { DateFnsModule } from 'ngx-date-fns';
import {IssuePipesModule} from '../../../pipes/issue-pipes.module';

@NgModule({
  declarations: [
    DeveloperIssuesComponent,
    DeveloperIssuesListComponent,
    DeveloperIssuesCalendarComponent,
  ],
    imports: [
        DeveloperIssuesRoutingModule,

        CommonModule,
        ReactiveFormsModule,
        AppLayoutModule,
        BlockModule,
        MenuModule,
        CalendarModule,

        IssuesListModule,
        DatePipesModule,
        DateFnsModule,
        DotModule,
        StackModule,
        IconModule,
        LinkModule,
        LabelModule,
        ButtonModule,
        IssuePipesModule,
    ]
})
export class DeveloperIssuesModule {

}
