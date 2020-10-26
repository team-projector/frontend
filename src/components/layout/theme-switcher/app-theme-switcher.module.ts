import { NgModule } from '@angular/core';
import { AppThemeSwitcherComponent } from './app-theme-switcher.component';
import { CommonModule } from '@angular/common';
import { JunteUiModule } from '@junte/ui';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    JunteUiModule
  ],
  exports: [
    AppThemeSwitcherComponent
  ],
  declarations: [
    AppThemeSwitcherComponent
  ]
})
export class AppThemeSwitcherModule {
}

