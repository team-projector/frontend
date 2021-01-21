import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppLayoutModule, BlockModule } from '@junte/ui';
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
    AppLayoutModule,
    BlockModule,
    UsersListModule
  ]
})
export class CompanyUsersModule {

}
