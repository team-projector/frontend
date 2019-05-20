import { NgModule } from '@angular/core';
import { DeveloperRoutingModule } from './developer-routing.module';
import { DeveloperComponent } from './developer.component';
import { JunteUiModule } from 'junte-ui';
import { SalariesListComponent } from './dashboard/salaries/salaries-list.component';
import { SalariesModule } from 'src/components/salaries/salaries.module';
import { UserWithMetricsResolver } from 'src/resolvers/user';
import { UsersServiceProvider } from 'src/services/users/provider';
import { SalariesServiceProvider } from 'src/services/salaries/provider';

@NgModule({
  declarations: [
    DeveloperComponent,
    SalariesListComponent
  ],
  imports: [
    JunteUiModule,
    DeveloperRoutingModule,
    SalariesModule
  ],
  providers: [
    UsersServiceProvider,
    SalariesServiceProvider,
    UserWithMetricsResolver
  ]
})
export class DeveloperModule {
}
