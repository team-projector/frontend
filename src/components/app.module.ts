import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeRu from '@angular/common/locales/ru';
import localeEn from '@angular/common/locales/en';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import { MeManager } from '../managers/me.manager';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { enUS as dfnsEnUS, ru as dfnsRu } from 'date-fns/locale';
import { Locale } from 'date-fns';

const FIRST_DAY_OF_WEEK: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1;

let locale = {
  code: 'ru',
  currency: '₽'
};

/*locale = {
  code: 'ru',
  firstDayOfWeek: 1,
  currency: 'ruble'
};*/

function mergeLocale(l: Locale): Locale {
  return {...l, ...{options: {weekStartsOn: FIRST_DAY_OF_WEEK}}};
}

const fnsConfig = new DateFnsConfigurationService();

switch (locale.code) {
  case 'ru':
    registerLocaleData(localeRu);
    fnsConfig.setLocale(mergeLocale(dfnsRu));
    break;
  default:
    registerLocaleData(localeEn);
    fnsConfig.setLocale(mergeLocale(dfnsEnUS));
}

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
      provide: DEFAULT_CURRENCY_CODE,
      useValue: locale.currency
    },
    {
      provide: LOCALE_ID,
      useValue: locale.code
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
