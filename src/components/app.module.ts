import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeRu from '@angular/common/locales/ru';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Locale } from 'date-fns';
import { enUS as dfnsEnUS, ru as dfnsRu } from 'date-fns/locale';
import { JunteUiModule, ru as jntRu, en as jntEn } from 'junte-ui';
import { DateFnsConfigurationService, DateFnsModule } from 'ngx-date-fns';
import { Language } from '../enums/language';
import { MeManager } from '../managers/me.manager';
import { detectLanguage } from '../utils/lang';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';

enum Currencies {
  rur = 'rur',
  usd = 'usd'
}

const CURRENCY_CODE: Currencies = Currencies.rur;
const FIRST_DAY_OF_WEEK: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 1;

const fnsConfig = new DateFnsConfigurationService();

enum LocaleData {
  NumberFormats = 14,
  CurrencyCode = 16
}

function getLocaleData(locale: any) {
  let changes;
  switch (CURRENCY_CODE) {
    case Currencies.rur:
      changes = {
        [LocaleData.NumberFormats]: localeRu[LocaleData.NumberFormats],
        [LocaleData.CurrencyCode]: localeRu[LocaleData.CurrencyCode]
      };
      break;
    case Currencies.usd:
    default:
      changes = {
        [LocaleData.NumberFormats]: localeEn[LocaleData.NumberFormats],
        [LocaleData.CurrencyCode]: localeEn[LocaleData.CurrencyCode]
      };

  }
  return {...locale, ...changes};
}

function mergeDfnsLocale(l: Locale): Locale {
  return {...l, ...{options: {weekStartsOn: FIRST_DAY_OF_WEEK}}};
}

const language = detectLanguage();
const providers: any[] = [
  {
    provide: Language,
    useValue: language
  },
  {
    provide: DateFnsConfigurationService,
    useValue: fnsConfig
  },
];

const imports = [];

let data;
switch (language) {
  case Language.ru:
    data = getLocaleData(localeRu);
    registerLocaleData(data);
    fnsConfig.setLocale(mergeDfnsLocale(dfnsRu));
    imports.push(JunteUiModule.forRoot({
      i18n: jntRu
    }));
    providers.push({
      provide: LOCALE_ID,
      useValue: 'ru'
    });
    break;
  case Language.en:
  default:
    data = getLocaleData(localeEn);
    registerLocaleData(data);
    fnsConfig.setLocale(mergeDfnsLocale(dfnsEnUS));
    imports.push(JunteUiModule.forRoot({
      i18n: jntEn
    }));
    providers.push({
      provide: LOCALE_ID,
      useValue: 'en'
    });
}

providers.push({
  provide: DEFAULT_CURRENCY_CODE,
  useValue: data[LocaleData.CurrencyCode]
});


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
    HttpClientModule,
    ...imports
  ],
  providers: [
    MeManager,
    CurrencyPipe,
    ...providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

