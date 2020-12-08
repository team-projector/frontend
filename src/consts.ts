import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import localeRu from '@angular/common/locales/ru';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';
import { Locale } from 'date-fns';
import { enUS as dfnsEnUS, ru as dfnsRu } from 'date-fns/locale';
import { localeEnUs as jntEnUs, i18nEn, JunteUiModule, localeRu as jntRu, i18nRu } from '@junte/ui';
import { DateFnsConfigurationService } from 'ngx-date-fns';
import { detectLanguage } from 'src/utils/lang';
import { Language } from './enums/language';

enum CurrencyCode {
  usd = 'usd',
  rur = 'rur'
}

export const BACKEND: {
  config: {
    currencyCode: CurrencyCode,
    firstWeekDay: 0 | 1,
    gitlabLoginEnabled: boolean,
    demoMode: boolean
  }
} = window['backend'] || {
  config: {
    currencyCode: CurrencyCode.usd,
    firstWeekDay: 1,
    gitlabLoginEnabled: true,
    demoMode: false
  }
};

export const PLATFORM_DELAY = 100;
export const UI_DELAY = 250;
export const MOCKS_DELAY = 1000;
export const DATE_FORMAT = 'yyyy-MM-dd';
export const DATE_TIME_FORMAT = 'yyyy-MM-dd\'T\'HH:mm:ss';
export const APPLICATION_READY = 'application_ready';

const CURRENCY_CODE = BACKEND.config.currencyCode;
export const FIRST_DAY_OF_WEEK: 0 | 1 = BACKEND.config.firstWeekDay;

const fnsConfig = new DateFnsConfigurationService();

enum LocaleData {
  NumberFormats = 14,
  CurrencyCode = 16
}

function getLocaleData(locale: Object) {
  let changes;
  switch (CURRENCY_CODE) {
    case CurrencyCode.rur:
      changes = {
        [LocaleData.NumberFormats]: localeRu[LocaleData.NumberFormats],
        [LocaleData.CurrencyCode]: localeRu[LocaleData.CurrencyCode]
      };
      break;
    case CurrencyCode.usd:
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
let dfnsLocale;
let config;
switch (language) {
  case Language.ru:
    data = getLocaleData(localeRu);
    registerLocaleData(data);
    dfnsLocale = mergeDfnsLocale(dfnsRu);
    fnsConfig.setLocale(dfnsLocale);
    config = {
      i18n: i18nRu,
      weekStartsOn: FIRST_DAY_OF_WEEK,
      locale: {
        ui: jntRu,
        dfns: dfnsLocale
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
    dfnsLocale = mergeDfnsLocale(dfnsEnUS);
    fnsConfig.setLocale(dfnsLocale);
    config = {
      i18n: i18nEn,
      hash: 'v2',
      weekStartsOn: FIRST_DAY_OF_WEEK,
      locale: {
        ui: jntEnUs,
        dfns: dfnsLocale
      }
    };
    providers.push({
      provide: LOCALE_ID,
      useValue: 'en'
    });
}

export const DFNS_LOCALE = dfnsLocale;
export const DFNS_OPTIONS = {locale: DFNS_LOCALE, weekStartsOn: FIRST_DAY_OF_WEEK};

providers.push({
  provide: DEFAULT_CURRENCY_CODE,
  useValue: data[LocaleData.CurrencyCode]
});

export const APP_MODULE_IMPORTS = [JunteUiModule.forRoot(config)];

export const SECONDS_IN_MINUTE = 60;
export const SECONDS_IN_HOUR = 3600;

export const TODAY = new Date();
