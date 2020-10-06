import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyPenaltiesComponent } from './company-penalties.component';

export const BONUSES_BREADCRUMB = $localize`:@@label.penalties:Penalties`;

const routes: Routes = [
  {
    path: '',
    component: CompanyPenaltiesComponent,
    data: {breadcrumb: BONUSES_BREADCRUMB}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyPenaltiesRoutingModule {

}
