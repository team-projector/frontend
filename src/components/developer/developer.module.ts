import { NgModule } from '@angular/core';
import { JunteUiModule } from 'junte-ui';
import { SalariesModule } from 'src/components/developer/salaries/salaries.module';
import { UserResolver } from 'src/resolvers/user';
import { AppFooterModule } from '../app-footer/app-footer.module';
import { DeveloperRoutingModule } from './developer-routing.module';
import { DeveloperComponent } from './developer.component';

@NgModule({
  declarations: [
    DeveloperComponent
  ],
  imports: [
    JunteUiModule,
    DeveloperRoutingModule,
    SalariesModule,
    AppFooterModule
  ],
  providers: [
    UserResolver
  ]
})
export class DeveloperModule {
}
