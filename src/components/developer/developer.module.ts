import { NgModule } from '@angular/core';
import { DeveloperRoutingModule } from './developer-routing.module';
import { DeveloperComponent } from './developer.component';
import { JunteUiModule } from 'junte-ui';
import { UserWithMetricsResolver } from 'src/resolvers/user';
import { UsersServiceProvider } from 'src/services/users/provider';
import { SalariesServiceProvider } from 'src/services/salaries/provider';
import { SalariesModule } from 'src/components/developer/salaries/salaries.module';

@NgModule({
  declarations: [
    DeveloperComponent
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
