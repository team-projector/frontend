import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeRu from '@angular/common/locales/ru';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Locale } from 'date-fns';
import { enUS as dfnsEnUS, ru as dfnsRu } from 'date-fns/locale';
import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import { Language } from '../enums/language';
import { MeManager } from '../managers/me.manager';
import { detectLanguage } from '../utils/lang';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';

const CURRENCY_CODE = '₽';
const FIRST_DAY_OF_WEEK: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1;

function mergeLocale(l: Locale): Locale {
  return {...l, ...{options: {weekStartsOn: FIRST_DAY_OF_WEEK}}};
}

const fnsConfig = new DateFnsConfigurationService();

function registerLocale() {
  switch (detectLanguage()) {
    case Language.ru:
      registerLocaleData(localeRu);
      fnsConfig.setLocale(mergeLocale(dfnsRu));
      return [{
        provide: LOCALE_ID,
        useValue: 'ru'
      }];
    case Language.en:
    default:
      registerLocaleData(localeEn);
      fnsConfig.setLocale(mergeLocale(dfnsEnUS));
      return [{
        provide: LOCALE_ID,
        useValue: 'en'
      }];
  }
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
    ...registerLocale(),
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: CURRENCY_CODE
    },
    {
      provide: Language,
      useValue: detectLanguage()
    },
    {
      provide: DateFnsConfigurationService,
      useValue: fnsConfig
    },
    MeManager,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
