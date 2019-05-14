import { NgModule } from '@angular/core';
import { DeveloperRoutingModule } from './developer-routing.module';
import { DeveloperComponent } from './developer.component';
import { JunteUiModule } from 'junte-ui';

@NgModule({
  declarations: [
    DeveloperComponent
  ],
  imports: [
    JunteUiModule,
    DeveloperRoutingModule
  ]
})
export class DeveloperModule {
}
