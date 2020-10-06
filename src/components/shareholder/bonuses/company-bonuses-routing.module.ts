import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyBonusesComponent } from './company-bonuses.component';

export const BONUSES_BREADCRUMB = $localize`:@@label.bonuses:Bonuses`;

const routes: Routes = [
  {
    path: '',
    component: CompanyBonusesComponent,
    data: {breadcrumb: BONUSES_BREADCRUMB}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyBonusesRoutingModule {

}
