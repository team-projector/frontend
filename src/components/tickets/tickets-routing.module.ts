import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketResolver } from '../../resolvers/ticket';
import { TicketsComponent } from './tickets.component';

const routes: Routes = [
  {
    path: ':ticket',
    component: TicketsComponent,
    resolve: {
      ticket: TicketResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {

}
