import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export function layoutMatcher() {
  return {consumed: []};
}

const routes: Routes = [
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule)
  },
  {
    matcher: layoutMatcher,
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      anchorScrolling: 'enabled',
      paramsInheritanceStrategy: 'always',
      scrollPositionRestoration: 'top',
      relativeLinkResolution: 'corrected',
      scrollOffset: [0, 80]
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
