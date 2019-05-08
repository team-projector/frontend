import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AuthorizationGuard } from 'src/guards/authorization.guard';
import { JunteUiModule } from 'junte-ui';
import { ArrayPipesModule } from 'src/pipes/array-pipes.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    JunteUiModule,
    DashboardRoutingModule,
    ArrayPipesModule
  ],
  providers: [
    AuthorizationGuard
  ]
})
export class DashboardModule {
}
