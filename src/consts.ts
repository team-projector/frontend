import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeRu from '@angular/common/locales/ru';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { Locale } from 'date-fns';
import { enUS as dfnsEnUS, ru as dfnsRu } from 'date-fns/locale';
import { en as jntEn, JunteUiModule, ru as jntRu } from '@junte/ui';
import { DateFnsConfigurationService } from 'ngx-date-fns';
import { detectLanguage } from 'src/utils/lang';
import { Language } from './enums/language';

export const PLATFORM_DELAY = 100;
export const MOCKS_DELAY = 1000;
export const DEFAULT_PAGE_SIZE = 20;
export const DATE_FORMAT = 'yyyy-MM-dd';
export const DATE_TIME_FORMAT = 'yyyy-MM-dd\'T\'HH:mm:ss';
export const APPLICATION_READY = 'application_ready';
export const CURRENT_LANGUAGE = 'current_language';

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
export const providers: any[] = [
  {
    provide: Language,
    useValue: language
  },
  {
    provide: DateFnsConfigurationService,
    useValue: fnsConfig
  },
];

let data;
let config;
switch (language) {
  case Language.ru:
    data = getLocaleData(localeRu);
    registerLocaleData(data);
    fnsConfig.setLocale(mergeDfnsLocale(dfnsRu));
    config = {
      i18n: jntRu,
      masks: {
        date: '__.__.____',
        time: '__:__',
        datetime: '__.__.____ __:__'
      },
      formats: {
        date: 'dd.MM.yyyy',
        time: 'HH:mm',
        datetime: 'dd.MM.yyyy HH:mm'
      },
      locale: {
        dfns: dfnsRu
      }
    };
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
    config = {
      i18n: jntEn,
      masks: {
        date: '__.__.____',
        time: '__:__',
        datetime: '__.__.____ __:__'
      },
      formats: {
        date: 'dd.MM.yyyy',
        time: 'HH:mm',
        datetime: 'dd.MM.yyyy HH:mm'
      },
      locale: {
        dfns: dfnsEnUS
      }
    };
    providers.push({
      provide: LOCALE_ID,
      useValue: 'en'
    });
}

providers.push({
  provide: DEFAULT_CURRENCY_CODE,
  useValue: data[LocaleData.CurrencyCode]
});

export const imports = [JunteUiModule.forRoot(config)];
