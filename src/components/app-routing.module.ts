import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

export function dashboardMatcher() {
  return {consumed: []};
}

const routes: Routes = [
  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupModule'
  },
  {
    matcher: dashboardMatcher,
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
