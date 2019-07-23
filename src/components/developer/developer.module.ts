import {NgModule} from '@angular/core';
import {DeveloperRoutingModule} from './developer-routing.module';
import {DeveloperComponent} from './developer.component';
import {JunteUiModule} from 'junte-ui';
import {UserResolver} from 'src/resolvers/user';
import {SalariesModule} from 'src/components/developer/salaries/salaries.module';

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
    UserResolver
  ]
})
export class DeveloperModule {
}
