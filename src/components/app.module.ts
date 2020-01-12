import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import { MeManager } from '../managers/me.manager';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import * as ru from 'date-fns/locale/ru';

registerLocaleData(localeRu);

const fnsConfig = new DateFnsConfigurationService();

// fnsConfig.setLocale(ru);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    DateFnsModule.forRoot()
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    },
    MeManager,
    CurrencyPipe,
    {
      provide: DateFnsConfigurationService,
      useValue: fnsConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
