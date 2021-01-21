import { NgModule } from '@angular/core';
import { BreadcrumbsModule, AppLayoutModule, MenuModule, GridModule } from '@junte/ui';
import { DateFnsModule } from 'ngx-date-fns';
import { AppFooterModule } from '../layout/footer/app-footer.module';
import { ShareholderRoutingModule } from './shareholder-routing.module';
import { ShareholderComponent } from './shareholder.component';

@NgModule({
  declarations: [
    ShareholderComponent
  ],
  imports: [
    ShareholderRoutingModule,

    MenuModule,
    AppLayoutModule,
    BreadcrumbsModule,
    GridModule,
    AppFooterModule,
    DateFnsModule
  ]
})
export class ShareholderModule {

}
