import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JunteUiModule } from '@junte/ui';
import { AppFooterModule } from '../app-footer/app-footer.module';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';

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
