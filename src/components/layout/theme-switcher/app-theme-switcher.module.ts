import { NgModule } from '@angular/core';
import { AppThemeSwitcherComponent } from './app-theme-switcher.component';
import { CommonModule } from '@angular/common';
import { FormModule, ThemeSwitcherModule } from '@esanum/ui';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormModule,
    ThemeSwitcherModule
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

