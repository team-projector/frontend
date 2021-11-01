import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFooterComponent } from './app-footer.component';
import { AppLayoutModule } from '@esanum/ui';

@NgModule({
  imports: [
    CommonModule,
    AppLayoutModule
  ],
  declarations: [
    AppFooterComponent
  ],
  exports: [
    AppFooterComponent
  ]
})
export class AppFooterModule {

}
