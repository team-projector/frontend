import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ManagerRoutingModule} from './manager-routing.module';
import {JunteUiModule} from 'junte-ui';
import {ManagerComponent} from './manager.component';
import { AppFooterModule } from '../app-footer/app-footer.module';

@NgModule({
  declarations: [
    ManagerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ManagerRoutingModule,
    JunteUiModule,
    AppFooterModule
  ],
  providers: []
})
export class ManagerModule {
}
