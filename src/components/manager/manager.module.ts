import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AppLayoutModule,
  BreadcrumbsModule,
  DotModule,
  GridModule,
  LinkModule
} from '@esanum/ui';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';
import { AppFooterModule } from '../layout/footer/app-footer.module';
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
    AppLayoutModule,
    BreadcrumbsModule,
    GridModule,
    LinkModule,
    DotModule,
    ArrayPipesModule,
    AppFooterModule
  ]
})
export class ManagerModule {

}
