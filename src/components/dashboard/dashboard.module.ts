import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AuthorizationGuard} from '../../guards/authorization.guard';
import {JunteUiModule} from 'junte-ui';
import {ArrayPipesModule} from '../../pipes/array-pipes.module';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
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
