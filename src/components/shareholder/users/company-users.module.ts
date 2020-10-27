import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JunteUiModule } from '@junte/ui';
import { UsersListModule } from '../../shared/users/list/users-list.module';
import { CompanyUsersRoutingModule } from './company-users-routing.module';
import { CompanyUsersComponent } from './company-users.component';

@NgModule({
  declarations: [
    CompanyUsersComponent
  ],
  imports: [
    CompanyUsersRoutingModule,

    CommonModule,
    JunteUiModule,
    UsersListModule
  ]
})
export class CompanyUsersModule {

}
