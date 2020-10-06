import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { AppFooterModule } from '../app-footer/app-footer.module';
import { DeveloperRoutingModule } from './developer-routing.module';
import { DeveloperComponent } from './developer.component';

@NgModule({
  declarations: [
    DeveloperComponent
  ],
  imports: [
    DeveloperRoutingModule,

    JunteUiModule,
    AppFooterModule,
    DateFnsModule
  ]
})
export class DeveloperModule {

}
