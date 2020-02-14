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

enum Currencies {
  usd = 'usd',
  rur = 'rur'
}

const CURRENCY_CODE = Currencies.rur;
const FIRST_DAY_OF_WEEK: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1;

const fnsConfig = new DateFnsConfigurationService();

enum LocaleData {
  NumberFormats = 14,
  CurrencyCode = 16
}

function getLocaleData(locale: any) {
  let data;
  switch (CURRENCY_CODE) {
    case Currencies.rur:
      data = {
        [LocaleData.NumberFormats]: localeRu[LocaleData.NumberFormats],
        [LocaleData.CurrencyCode]: localeRu[LocaleData.CurrencyCode]
      };
      break;
    case Currencies.usd:
    default:
      data = {
        [LocaleData.NumberFormats]: localeEn[LocaleData.NumberFormats],
        [LocaleData.CurrencyCode]: localeEn[LocaleData.CurrencyCode]
      };

  }
  return {...locale, ...data};
}

function mergeLocale(l: Locale): Locale {
  return {...l, ...{options: {weekStartsOn: FIRST_DAY_OF_WEEK}}};
}

function registerLocale() {
  let data;
  switch (detectLanguage()) {
    case Language.ru:
      data = getLocaleData(localeRu);
      registerLocaleData(data);
      fnsConfig.setLocale(mergeLocale(dfnsRu));
      return [{
        provide: LOCALE_ID,
        useValue: 'ru'
      }, {
        provide: DEFAULT_CURRENCY_CODE,
        useValue: data[LocaleData.CurrencyCode]
      }];
    case Language.en:
    default:
      data = getLocaleData(localeEn);
      registerLocaleData(data);
      fnsConfig.setLocale(mergeLocale(dfnsEnUS));
      return [{
        provide: LOCALE_ID,
        useValue: 'en'
      },
        {
          provide: DEFAULT_CURRENCY_CODE,
          useValue: data[LocaleData.CurrencyCode]
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
    DateFnsModule.forRoot(),
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [
    ...registerLocale(),
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
