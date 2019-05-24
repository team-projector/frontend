import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ManagerRoutingModule} from './manager-routing.module';
import {JunteUiModule} from 'junte-ui';
import {ManagerComponent} from './manager.component';

@NgModule({
  declarations: [
    ManagerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ManagerRoutingModule,
    JunteUiModule
  ],
  providers: []
})
export class ManagerModule {
}
